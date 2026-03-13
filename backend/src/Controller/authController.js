const { Passport } = require('passport');
const prisma = require('../../prisma');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const regUser = async (req, res) => {
  try {

    const { name, email, password, bio } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(401).json({
        message: "You are already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let avatarUrl = null;

    if (req.file) {

      const result = await cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        async (error, result) => {

          if (error) {
            console.log(error);
            return res.status(500).json({
              message: "Image upload failed"
            });
          }

          avatarUrl = result.secure_url;

          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
              bio,
              avatar: avatarUrl
            }
          });

          return res.json({
            message: "User registered successfully",
            user: newUser
          });

        }
      );

      result.end(req.file.buffer);

    } else {

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          bio
        }
      });

      return res.json({
        message: "User registered successfully",
        user: newUser
      });

    }

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const loginUser = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {

      if (err) return next(err);

      if (!user) {
        return res.status(401).json({
          message: info.message
        });
      }

      req.logIn(user, { session: false }, (err) => {

        if (err) return next(err);

        // create JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

        return res.json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });

      });

    })(req, res, next);

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const userProfile = async (req , res) => {
    try {
        const userID = req.user.id;

        const user = await prisma.user.findUnique({
            where : {
                id : Number(userID)
            }
        })

        if(!user){
            return res.status(401).json({message : "User not found"});
        }else{
            return res.status(200).json({message : "User found" , user : user});
        }
      }catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal server error"});
      }
}

const editUser  = async(req , res) => {
      try {
          const userID = req.user.id;
    const { name ,email ,bio ,avatar } = req.body;

    const user = await prisma.user.findUnique({
       where: {
        id : Number(userID)
       }
    })

    if(!user){
        return res.status(401).json({message : "User not found"});
    }else{
       const editedUser = await prisma.user.update({
        where : {
            id : Number(userID)
        },
        data : {
            name,
            email,
            bio,
            avatar
        }
       });

       if(!editedUser){
        return res.status(401).json({message : "User not found"});
       }else{
        return res.status(200).json({message : "User updated successfully" , user : editedUser});
       }
    }

      } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal server error"});
      }
 }

 const deleteUser = async (req , res ) => {
   try {
    
    const userID = req.user.id;

    const user = await prisma.user.findUnique({
      where : {
        id : Number(userID)
      }
    })
    if (user) {
       await prisma.follow.deleteMany({
               where: {
                 OR: [
                   { followerId: userID },
                   { followingId: userID }
                 ]
               }
             });
         
             await prisma.like.deleteMany({
               where: { userId : userID }
             });
         
             await prisma.comment.deleteMany({
               where: { userId :userID }
             });
         
             await prisma.post.deleteMany({
               where: { authorId: userID }
             });
         
             const deletedUser = await prisma.user.delete({
               where: { id: userID }
             });

        return res.status(200).json({message : "User deleted successfully" , user : deletedUser});
    } else {
       return res.status(401).json({message : "User not found"});
    }

   } catch (error) {
    console.log(error);
    
      return res.status(500).json({message : "Internal server error"}, error);
   }
 }


module.exports = {
    regUser,
    loginUser,
    editUser,
    deleteUser,
    userProfile
}