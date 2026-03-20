const postService = require("../Services/postService");

const allPosts = async (req, res) => {
  try {

    const posts = await postService.getAllPosts();

    return res.status(200).json(posts);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const addPost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await postService.createPost(
      req.user.id,
      content,
      req.file
    );

    return res.status(200).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editPost = async (req, res) => {
  try {

    const { content } = req.body;
    const postId = Number(req.params.id);
 
    const updatedPost = await postService.updatePost( postId, req.user.id, content, req.file)
     return res.status(200).json({
       message: "Post updated successfully",
       post: updatedPost
     });
    } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const userPost = async(req ,res ) => {
      try {
          const userID = req.user.id;
          console.log(userID);
          
          const userPosts = await postService.getPostsByUser(userID)
        
          if(!userPosts){
             console.log("You don't have any postes yet :");
             return res.status(404).json({ message: "No posts found" });
          }
          return res.status(200).json(userPosts);

      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
}

const deletePost = async (req, res) => {
  try {
    await postService.deletePostWithRelations(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {

    if (error.message === "UNAUTHORIZED") {
      return res.status(403).json({ message: "Not allowed" });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
    allPosts,
    addPost,
    userPost,
    editPost,
    deletePost
}