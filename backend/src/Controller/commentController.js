const { text } = require("express");
const prisma = require("../../prisma");
const commentService = require("../Services/commentService");

const allCommentPost = async(req , res) => {
      try {
            const postId = req.params.id;
       
            const comments = await commentService.allCommentOfPost(postId);
       
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
 
        console.log(userId , postId, comment);
        
        const newComment = await commentService.addComment(userId , postId , comment);

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
        
        const existComment = await commentService.findComment(commentId , userId);

        if (!existComment) {
            console.log("There was no comment with this id sir :");
            return res.status(404).json({message: "There was no comment with this id sir :"})
        }
        console.log(existComment.userId);
        
        if (existComment.userId !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to edit this comment sir :"});
        }

        const editedComment = await commentService.editCommnet(commentId , comment)

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

         const existComment = await commentService.deleteComment(commentId , userId);

        if (!existComment) {
            console.log("There was no comment with this id sir :");
            return res.status(404).json({message: "There was no comment with this id sir :"})
        }
        if (existComment.userId !== req.user.id) {
            console.log("You are not authorized to delete this comment sir :");
            return res.status(403).json({message: "You are not authorized to delete this comment sir :"});
        }

        const deletedComment = await commentService.deleteComment(commentId , userId);

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