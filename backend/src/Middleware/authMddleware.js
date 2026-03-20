const jwt = require("jsonwebtoken");
const prisma = require("../../prisma");

const authMiddleware = async(req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.email);

    const existUser = await prisma.user.findUnique({
      where : {
        email : decoded.email
      }
    })  
    console.log(existUser);
    
    if (existUser) {
      req.user = existUser;
      next();
    }


  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }
};

module.exports = authMiddleware;