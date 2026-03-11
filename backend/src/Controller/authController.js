const prisma = require('../../prisma');
const bcrypt = require('bcrypt');


const regUser = async (req ,res) => {
    try {
        
    const { name ,email ,password ,bio ,avatar} = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser){
        return res.status(401).json({message : "You are already registered"});
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
            bio,
            avatar
        }
    })

    res.json({message : "User registered successfully" , user : newUser});
    } catch (error) {
        console.log(error); 
        res.status(500).json({message : "Internal server error"});
    }
}


module.exports = {
    regUser
}