const prisma = require("../../prisma");

const allFollowers = async (req, res) => {
  try {

    const userId = req.user.id;

    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    if (followers.length === 0) {
      return res.status(404).json({
        message: "No followers found"
      });
    }

   return res.status(200).json({
      followers
    });

  } catch (error) {
    console.log(error);
   return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const followUser = async (req, res) => {
  try {

    const followerId = req.user.id; 
    const followingId = Number(req.params.id); 

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself"
      });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });

    if (existingFollow) {
      return res.json({
        message: "Already following"
      });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId
      }
    });

   return res.json({
      message: "Followed successfully",
      follow
    });

  } catch (error) {
    console.log(error);
   return res.status(500).json({
      message: "Server error"
    });
  }
};

const  unfollowUser = async (req, res) => {

  try {
      const followerId = req.user.id
      const followingId = Number(req.params.id)
    
        const unfollowed = await prisma.follow.deleteMany({
              where: {
                followerId,
                followingId
              }
            })
            if (!unfollowed) {
              return  res.status(404).json({ message: "User not found" });
            }
    
     return res.json({
        message: "Unfollowed successfully"
      })
  } catch (error) {
    console.log(error);
    
   return res.status(500).json({ message: "Server error" });
  }
}



module.exports= {
    allFollowers,
    followUser,
    unfollowUser
}