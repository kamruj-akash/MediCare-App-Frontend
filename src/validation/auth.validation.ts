import { z } from "zod";

export const LoginZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const PatientRegisterZodSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    contactNumber: z
      .string()
      .refine(
        (value) =>
          value === "" ||
          /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8}|8801[3-9]\d{8})$/.test(value),
        {
          message: "Invalid contact number",
        },
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
