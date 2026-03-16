const prisma = require("../../prisma");

const allCommentPost = async(req , res) => {
      try {
            const postId = req.params.id;
       
            const comments = await prisma.comment.findMany({
               where: {
                   postId: Number(postId)
               },
               include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      avatar: true
                    }
                  }
               },
                orderBy: {
                  createdAt: "desc"
               }
            })
       
            if (!comments) {
                console.log("There was no comments on post sir :");
                return res.status(404).json({message: "There was no comments on post sir :"});
            }
       
            return res.status(200).json(comments);

      } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal server error"})
      }
}

const addComment = async(req  , res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        const {comment} = req.body;

        const newComment = await prisma.comment.create({
            data : {
                userId : Number(userId),
                postId : Number(postId),
                text : comment
            }
        })

        if (!newComment) {
            console.log("Ther was an error to add comment sir :");
            return res.status(404).json({message: "Ther was an error to add comment sir :"});
        }

        return res.status(200).json(newComment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const editComment = async(req , res) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.id;
        const {comment} = req.body;
        
        console.log(userId);
        
        const existComment = await prisma.comment.findFirst({
            where: {
                id: Number(commentId),
                userId: Number(userId)
            }
        })

        if (!existComment) {
            console.log("There was no comment with this id sir :");
            return res.status(404).json({message: "There was no comment with this id sir :"})
        }
        console.log(existComment.userId);
        
        if (existComment.userId !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to edit this comment sir :"});
        }

        const editedComment = await prisma.comment.update({
            where: {
                id: Number(commentId)
            },
            data: {
                text: comment
            }
        })

        if (!editedComment) {
            console.log("There was an error to edit comment sir :");
            return res.status(404).json({message: "There was an error to edit comment sir :"});
        }
        
        return res.status(200).json({message : "Your comment was edited successfully sir :"},editedComment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


const deleteComment = async(req , res) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.id;

         const existComment = await prisma.comment.findFirst({
            where: {
                id: Number(commentId),
                userId: Number(userId)
            }
        })

        if (!existComment) {
            console.log("There was no comment with this id sir :");
            return res.status(404).json({message: "There was no comment with this id sir :"})
        }
        if (existComment.userId !== req.user.id) {
            console.log("You are not authorized to delete this comment sir :");
            return res.status(403).json({message: "You are not authorized to delete this comment sir :"});
        }

        const deletedComment = await prisma.comment.delete({
            where: {
                id: Number(commentId)
            }
        })

        if (!deletedComment) {
            console.log("There was an error to delete comment sir :");
            return res.status(404).json({message: "There was an error to delete comment sir :"});
        }

        return res.status(200).json({message : "Your comment was deleted successfully sir :"},deletedComment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}



module.exports = {
    allCommentPost,
    addComment,
    editComment,
    deleteComment
}