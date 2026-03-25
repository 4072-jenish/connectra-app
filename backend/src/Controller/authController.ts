import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import sgMail from "@sendgrid/mail";
import userService from "../Services/authService";

// interface AuthRequest extends Request {
//   user : AuthUser
// }

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const regUser = async (req: Request, res: Response): Promise<Response> => {
  
  try {
    const { name, email, password, bio } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    let avatarUrl: string | null = null;

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const upload = await cloudinary.v2.uploader.upload(base64Image, {
        folder: "avatars",
      });

      avatarUrl = upload.secure_url;
    }

    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      bio,
      avatar: avatarUrl,
      isVerified: false,
      otp,
      otpExpiry,
    });

    await sgMail.send({
      to: email,
      from: "hariyanijenish@gmail.com",
      subject: "Verify Email",
      html: `<h1>${otp}</h1>`,
    });

    return res.status(201).json({ message: "OTP sent", email: newUser.email });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Verify email first" });
    }

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err);

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      return res.json({ token, user });
    });
  })(req, res, next);
};

export const userProfile = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const user = await userService.getUserById(req.user?.id);
  // return res.json(user);
};

export const editUser = async (req: Request, res: Response) => {
  // const user = await userService.editedUser(req.user?.id, req.body);
  // return res.json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  // const user = await userService.deleteUserWithRelation(req.user?.id);
  // return res.json({ user });
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  if (!user.otpExpiry || user.otpExpiry < new Date()) {
  return res.status(400).json({ message: "OTP expired" });
}

  await userService.verifiedUser(email, {
    isVerified: true,
    otp: null,
    otpExpiry: null,
  });

  return res.json({ message: "Verified" });
};