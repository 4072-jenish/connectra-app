const prisma = require("../../prisma")

const getAlluser = async () => {
    return await prisma.user.findMany();
}

const findUser = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

const searchUser = async (search) => {
    return await prisma.user.findMany({
         where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            email: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      }
    })
}


module.exports = {
    getAlluser,
    findUser,
    searchUser
}