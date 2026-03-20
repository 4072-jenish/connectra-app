const prisma = require("../../prisma");

const allCommentOfPost = async (postId) => {
    return await prisma.comment.findMany({
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
}

const findComment = async (commentId , userId) => {
    return await prisma.comment.findUnique({
        where: {
            id: Number(commentId),
            userId : Number(userId)
        }
    })
}

const addComment = async (userId , postId , text) => {
    return await prisma.comment.create({
            data : {
              userId : userId,
              postId : Number(postId),
              text : text
            }
        })
}

const editCommnet = async (commentId , data) => {
     return await prisma.comment.update({
        where: {
            id: Number(commentId)
        },
        data : {
            text : data
        }
     })
}

const deleteComment = async (commentId , userID) => {
    return await prisma.comment.delete({
        where: {
            id: Number(commentId),
            userId: Number(userID)
        }
    })
}



module.exports = {
     allCommentOfPost,
     findComment,
     addComment,
     editCommnet,
     deleteComment
}