import {z} from 'zod';

// Helper to treat empty strings as undefined so `.optional()` works when frontends send ""
const emptyToUndefined = (val) => (typeof val === 'string' && val.trim() === '') ? undefined : val;

export const userLoginSchema = z.object({
    username: z.preprocess(emptyToUndefined, z.string()
    .min(3, {message: "Username must be at least 3 characters long"})
    .max(30, {message: "Username must be at most 30 characters long"})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"}).optional()),

    email: z.preprocess(emptyToUndefined, z.string().email({message: "Invalid email address"}).optional()),

    password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"})

})

export const userRegisterSchema = z.object({
    fullname: z.string().min(3, {message: "Fullname must be at least 3 characters long"})
    .regex(/^[a-zA-Z\s]+$/, {message: "Fullname can only contain letters and spaces"}),

    username: z.preprocess(emptyToUndefined, z.string()
    .min(3, {message: "Username must be at least 3 characters long"})
    .max(30, {message: "Username must be at most 30 characters long"})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"}).optional()),

    email: z.preprocess(emptyToUndefined, z.string().email({message: "Invalid email address"}).optional()),

    password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),

    confirmPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"})

})

export const userPasswordSchema = z.object({
    oldPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),

    newPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),

    confirmPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),
})

export const updateUserProfileSchema = z.object({
     fullname: z.preprocess(emptyToUndefined, z.string().min(3, {message: "Fullname must be at least 3 characters long"})
    .regex(/^[a-zA-Z\s]+$/, {message: "Fullname can only contain letters and spaces"})
    .optional()),

    username: z.preprocess(emptyToUndefined, z.string()
    .min(3, {message: "Username must be at least 3 characters long"})
    .max(30, {message: "Username must be at most 30 characters long"})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"})
    .optional()),

    email: z.preprocess(emptyToUndefined,z.string().email({message: "Invalid email address"}).optional()),

})