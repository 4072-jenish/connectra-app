
const likeService = require("../Services/likeService")

const allLikewithPost = async(req , res ) => {
     try {
            const  postId  = req.params.id;
            const allLike = await likeService.getAllLikes(postId);
         
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

    const existingLike = await likeService.findLike(userId, postId);
    console.log("LIKE API HIT");
      console.log("USER:", userId);
      console.log("POST:", postId);

    if (existingLike) {

      // remove like
      await likeService.deleteLike(userId,postId)
      console.log("LIKE API HIT");
      console.log("USER:", userId);
      console.log("POST:", postId);

      return res.json({
        message: "Like removed"
      });

    } else {

      // add like
      await likeService.addLike(userId , postId);

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