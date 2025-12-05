import {z} from 'zod';

export const userLoginSchema = z.object({
    username: z.string()
    .min(3, {message: "Username must be at least 3 characters long"})
    .max(30, {message: "Username must be at most 30 characters long"})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"})
    .optional(),

    email: z.email({message: "Invalid email address"}).string().optional(),

    password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"})

})

export const userRegisterSchema = z.object({
    username: z.string()
    .min(3, {message: "Username must be at least 3 characters long"})
    .max(30, {message: "Username must be at most 30 characters long"})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"})
    .optional(),

    email: z.email({message: "Invalid email address"}).string().optional(),

    password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),

    confirmPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"})

})