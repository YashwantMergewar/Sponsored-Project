import { z } from "zod";

export const voterRegistrationSchema = z.object({
    fullname: z.string()
    .min(3, "Fullname must be at least 3 characters long")
    .max(100, "Fullname must be at most 100 charcters long")
    .regex(/^[a-zA-Z\s]+$/, {message: "Fullname can only contain letters and spaces"}),

    email: z.string().email({message: "Invalid email address"}),

    head_of_family: z.string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Fullname must be at most 100 charcters long")
    .regex(/^[a-zA-Z\s]+$/, {message: "Name can only contain letters and spaces"}),

    mobile_no: z.string()
    .trim()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => {
        const mobile = val.startsWith("91") ? val.slice(2) : val;
        return /^[6-9]\d{9}$/.test(mobile);
    }, {
        message: "Invalid Indian mobile number"
    })
    .transform((val) => {
        const mobile = val.startsWith("91") ? val.slice(2) : val;
        return `+91${mobile}`; // normalized format
    }),

    aadhar_no: z.string()
    .length(12, {message: "Aadhar number must be exactly 12 digits"})
    .regex(/^\d{12}$/, {message: "Aadhar number must contain only digits"}),

    dob: z.coerce.date({
        required_error: "Please select a date of birth",
        invalid_type_error: "Date of Birth must be a valid date"
    }),

    age: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number"
    })
    .min(18, {message: "Age must be at least 18"})
    .max(100, {message: "Age must be at most 100"}),

    religion: z.string()
    .min(3, "Religion must be at least 3 characters long")
    .max(50, "Religion must be at most 50 characters long"),

    caste: z.string()
    .min(3, "Caste must be at least 3 characters long")
    .max(10, "Caste must be at most 10 characters long"),

    category: z.string()
    .min(2, "Category must be at least 2 characters long")
    .max(10, "Category must be at most 10 characters long"),

    prabhag_no: z.number({
        required_error: "Prabhag number is required",
        invalid_type_error: "Prabhag number must be a number"
    })
    .min(1, {message: "Prabhag number must be at least 1"}),

    house_no: z.string()
    .min(1, "House number must be at least 1 character long")
    .max(20, "House number must be at most 20 characters long")
    .optional()

})

export const voterUpdateSchema = z.object({
    fullname: z.string()
    .min(3, "Fullname must be at least 3 characters long")
    .max(100, "Fullname must be at most 100 charcters long")
    .regex(/^[a-zA-Z\s]+$/, {message: "Fullname can only contain letters and spaces"})
    .optional(),

    email: z.string().email({message: "Invalid email address"})
    .optional(),

    head_of_family: z.string()
    .min(3, "Fullname must be at least 3 characters long")
    .max(100, "Fullname must be at most 100 charcters long")
    .regex(/^[a-zA-Z\s]+$/, {message: "Fullname can only contain letters and spaces"})
    .optional(),

    mobile_no: z.string()
    .trim()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => {
        const mobile = val.startsWith("91") ? val.slice(2) : val;
        return /^[6-9]\d{9}$/.test(mobile);
    }, {
        message: "Invalid Indian mobile number"
    })
    .transform((val) => {
        const mobile = val.startsWith("91") ? val.slice(2) : val;
        return `+91${mobile}`; // normalized format
    })
    .optional(),

    aadhar_no: z.string()
    .length(12, {message: "Aadhar number must be exactly 12 digits"})
    .regex(/^\d{12}$/, {message: "Aadhar number must contain only digits"})
    .optional(),

    dob: z.coerce.date({
        required_error: "Please select a date of birth",
        invalid_type_error: "Date of Birth must be a valid date"
    }).optional(),

    age: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number"
    })
    .min(18, {message: "Age must be at least 18"})
    .max(100, {message: "Age must be at most 100"})
    .optional(),

    religion: z.string()
    .min(3, "Religion must be at least 3 characters long")
    .max(50, "Religion must be at most 50 characters long")
    .optional(),

    caste: z.string()
    .min(3, "Caste must be at least 3 characters long")
    .max(100, "Caste must be at most 100 characters long")
    .optional(),

    category: z.string()
    .min(3, "Category must be at least 3 characters long")
    .max(50, "Category must be at most 50 characters long")
    .optional(),

    prabhag_no: z.number({
        required_error: "Prabhag number is required",
        invalid_type_error: "Prabhag number must be a number"
    })
    .min(1, {message: "Prabhag number must be at least 1"})
    .optional(),

    house_no: z.string()
    .min(1, "House number must be at least 1 character long")
    .max(20, "House number must be at most 20 characters long")
    .optional()
})