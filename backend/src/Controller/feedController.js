const prisma = require("../../prisma");

const feedContent = async (req , res) => {
    try {
         const userId = req.user.id;

    const following = await prisma.follow.findMany({
      where: {
        followerId: userId
      },
      select: {
        followingId: true
      }
    });

    const followingIds = following.map(f => f.followingId);
    console.log(followingIds);
    

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        likes: true,
        comments: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
     console.log(posts);
     
     if (!posts) {
        console.log('There was no posted from your followers');
        return res.status(404).json({message: "There was no posted from your followers"});
     }

    return res.json(posts);
    }catch(error){
            console.log(error);
            return res.status(500).json({message: "Internal server error"});
            
    }
}



module.exports = {
    feedContent
}