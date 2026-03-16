const prisma = require("../../prisma")
const cloudinary = require("../Middleware/cloudinary");

const allPosts = async (req, res) => {
  try {

    const posts = await prisma.post.findMany({
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
    let imageUrl = null;
    let publicId = null;

    if (req.file) {

      const stream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        async (error, result) => {

          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Image upload failed" });
          }

          imageUrl = result.secure_url;
          publicId = result.public_id;

          const newPost = await prisma.post.create({
            data: {
              content,
              image: imageUrl,
              publicId: publicId,
              authorId: req.user.id
            }
          });

          return res.status(200).json({
            message: "Post created successfully",
            post: newPost
          });
        }
      );

      stream.end(req.file.buffer);

    } else {

      const newPost = await prisma.post.create({
        data: {
          content,
          authorId: req.user.id
        }
      });

      return res.status(200).json({
        message: "Post created successfully",
        post: newPost
      });

    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const editPost = async (req, res) => {
  try {

    const { content } = req.body;
    const postId = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to edit this post"
      });
    }

    let imageUrl = post.image;
    let publicId = post.publicId;

    if (req.file) {

      if (post.publicId) {
        await cloudinary.uploader.destroy(post.publicId);
      }

      const stream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        async (error, result) => {

          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Image upload failed" });
          }

          imageUrl = result.secure_url;
          publicId = result.public_id;

          const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
              content,
              image: imageUrl,
              publicId: publicId
            }
          });

          return res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
          });
        }
      );

      stream.end(req.file.buffer);

    } else {

      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { content }
      });

      return res.status(200).json({
        message: "Post updated successfully",
        post: updatedPost
      });

    }

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
          
          const userPosts = await prisma.post.findMany({
            where: {
              authorId: Number(userID)
            }
          })
        
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
const singlePost = async(req ,res ) => {
      try {
          const postID = req.params.id;
          
          const singlepost = await prisma.post.findUnique({
            where : {
              id : Number(postID)
            }
          })

          if (!singlepost) {
             console.log("Cann't find single post :");
             return res.status(404).json({ message: "No posts found" });
          }

          return res.status(200).json(singlepost);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
}
const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await prisma.post.findFirst({
      where: {
        id: Number(postId),
        authorId: Number(userId)
      }
    });

    if (!post) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    // 🔹 Delete likes related to this post
    await prisma.like.deleteMany({
      where: {
        postId: Number(postId)
      }
    });

    // 🔹 Delete comments related to this post
    await prisma.comment.deleteMany({
      where: {
        postId: Number(postId)
      }
    });

    // 🔹 Delete image from Cloudinary if exists
    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }

    // 🔹 Delete the post
    await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    });

    return res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


module.exports = {
    allPosts,
    addPost,
    userPost,
    singlePost,
    editPost,
    deletePost
}