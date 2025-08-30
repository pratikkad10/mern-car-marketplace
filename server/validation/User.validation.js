import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    profilePic: z.string().url("Must be a valid URL").optional(),
    gender: z.enum(["Male", "Female", "Other"], "Invalid gender"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
