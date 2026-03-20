const prisma = require("../../prisma")

const addLike = async (userId , postId) => {
    await prisma.like.create({
        data: {
            userId,
            postId
        }
    })
}

const deleteLike = async (userId , postId) => {
     await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });
}

const getAllLikes = async (id) => {
    return await prisma.like.findMany({
        where: {
            postId : Number(id)
        }
    })
}

const findLike = async (userId , postId) => {
    return await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId,
                postId
            }
        }
    })
}


module.exports = {
    addLike,
    deleteLike,
    getAllLikes,
    findLike
}