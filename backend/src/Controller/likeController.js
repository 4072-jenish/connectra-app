const prisma = require("../../prisma");

const allLikewithPost = async(req , res ) => {
     try {
            const  postId  = req.params.id;
            const allLike = await prisma.like.findMany({
                where : {
                    postId : Number(postId)
                }
            });
         
            if (!allLike) {
                 console.log("There was no likes on your post sir :");
                return res.status(404).json({ message: "There was no likes on your post sir :" });
            }
            return res.status(200).json({ allLike });
     } catch (error) {
             console.log(error); 
            return res.status(500).json({ message: "There was an error in getting all likes" });
     }
}

const toggleLike = async (req, res) => {
  try {

    const userId = req.user.id;
    const postId = Number(req.params.id);

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (existingLike) {

      // remove like
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      return res.json({
        message: "Like removed"
      });

    } else {

      // add like
      await prisma.like.create({
        data: {
          userId,
          postId
        }
      });

      return res.json({
        message: "Post liked"
      });

    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};



module.exports = {
    allLikewithPost,
    toggleLike
}