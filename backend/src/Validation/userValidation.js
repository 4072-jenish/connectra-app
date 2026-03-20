const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};