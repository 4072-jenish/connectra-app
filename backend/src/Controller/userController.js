const prisma = require("../../prisma")

const getAllUser = async(req , res) => {
      try {
           const users = await prisma.user.findMany();

           if (!users) {
                res.status(404).json({message: "No users found"});
           }
          return res.status(200).json(users);

      } catch (error) {
         return res.status(500).json({message: "Something went wrong"});
      }
}

const singleUser = async(req , res) => {
     try {
          const {id} = req.params;

          const user = await prisma.user.findUnique({
               where: {
                    id: Number(id)
               }
          })
                
          if (!user) {
             return  res.status(404).json({message: "No user found"});
          }
          return res.status(200).json(user);
     } catch (error) {
          return res.status(500).json({message: "Something went wrong"});
     }
}
 
const searchUser = async (req, res) => {
  console.log("Search API called");

  try {
    const { search } = req.query;

    const users = await prisma.user.findMany({
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
    });

    res.json({ users });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = {
    getAllUser,
    singleUser,
    searchUser
}