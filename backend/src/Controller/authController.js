  const prisma = require('../../prisma');
  const bcrypt = require('bcrypt');
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  const cloudinary = require('cloudinary');
  const sgMail = require("@sendgrid/mail");
  const userService = require('../Services/authService')


  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.SENDGRID_API_KEY);
  

  const regUser = async (req, res) => {
  try {
      const { name, email, password, bio } = req.body;
  
      const existingUser = await userService.getUserByEmail(email);
  
      if (existingUser) {
        return res.status(400).json({
          message: "Already registered"
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  
      let avatarUrl = null;
  
      if (req.file) {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
          folder: "avatars"
        });
  
        avatarUrl = uploadResult.secure_url;
      }
  
     const newUser = await userService.createUser({
          name,
          email,
          password: hashedPassword,
          bio,
          avatar: avatarUrl,
          isVerified: false,
          otp,
          otpExpiry
     })
     
  
      await sgMail.send({
        to: email,
        from: "hariyanijenish@gmail.com",
        subject: "Please Verify your gamil to register on Connectra",
        html: `
          <h2>Your OTP Code</h2>
          <h1>${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        `
      });
        console.log("otp sent");
        console.log(otp);
        
      return res.status(201).json({
        message: "OTP sent to email",
        email: newUser.email 
      });
  
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
        if (!user.isVerified) {
          return res.status(403).json({
            message: "Please verify your email first"
          });
        }
        req.logIn(user, { session: false }, (err) => {

          if (err) return next(err);
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

          const user = await userService.getUserById(userID);
          
          if(!user){
              return res.status(401).json({message : "User not found"});
          }else{
              return res.status(200).json({message : "User found" , user : user});
          }
        }catch(error){
          console.log(error);
          return res.status(500).json({message : "Internal server error"});
        }
  };

  const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await userService.getFullUserProfile(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const editUser  = async(req , res) => {
        try {
          console.log("from editProfile controller");
          const userID = req.user.id;
          console.log(req.body);
          const { name ,email ,bio ,avatar } = req.body;
      
          const user = await userService.getUserById(userID)
          if(!user){
              return res.status(401).json({message : "User not found"});
          }else{
            const editedUser = await userService.editedUser({userID }, {name , email , bio , avatar});
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
  };

  const deleteUser = async (req , res ) => {
    try {
      
      const userID = req.user.id;

      const user = await userService.deleteUserWithRelation(userID);

      return res.status(200).json({
      message: "User deleted successfully",
      user: user
    });
    } catch (error) {
      console.log(error);
      
        return res.status(500).json({message : "Internal server error"}, error);
    }
  };

  const verifyOTP = async(req , res) => {
      try {
        const { email, otp } = req.body;
    
        const user = await userService.getUserByEmail(email);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        if (user.otp !== otp) {
          return res.status(400).json({ message: "Invalid OTP" });
        }
    
        if (user.otpExpiry < new Date()) {
          return res.status(400).json({ message: "OTP expired" });
        }
    
        await userService.editedUser(email , { isVerified: true, otp: null, otpExpiry: null });

        return res.json({ message: "Verification successful" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
  }
 
  module.exports = {
      regUser,
      loginUser,
      editUser,
      deleteUser,
      userProfile,
      getUserById,
      verifyOTP
  }