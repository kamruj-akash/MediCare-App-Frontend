import { z } from "zod";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
} from "./doctor.application.validation";

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

export const DoctorVerificationZodSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Enter the six-digit verification code"),
  specialization: z.string().min(2, "Specialization is required"),
  licenseNumber: z.string().min(3, "License number is required"),
  qualification: z.string().min(2, "Qualification is required"),
  expYear: z
    .number()
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(80, "Enter a valid number of years"),
  bio: z
    .string()
    .min(20, "Tell patients a little more about your experience")
    .max(1000, "Bio must be 1,000 characters or less"),
  consultationFee: z
    .string()
    .regex(/^\d+(?:\.\d{1,2})?$/, "Enter a valid consultation fee"),
  contactNumber: z
    .string()
    .regex(
      /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8}|8801[3-9]\d{8})$/,
      "Enter a valid Bangladeshi contact number",
    ),
  resume: z
    .custom(
      (value) =>
        value === null ||
        (value instanceof File &&
          isAcceptedFileSize(value.size) &&
          isAcceptedFileType(value.type)),
      {
        message:
          "Resume must be a PDF or Word document and not exceed 5MB in size",
      },
    )
    .refine((value) => value instanceof File, {
      message: "Resume is required",
    }),
  additionalFiles: z
    .array(z.custom<File>((value) => value instanceof File))
    .max(5, "You can upload a maximum of 5 additional files")
    .refine(
      (files) => {
        return files.every(
          (file) =>
            isAcceptedFileSize(file.size) && isAcceptedFileType(file.type),
        );
      },
      {
        message:
          "Additional files must be PDF or Word documents and not exceed 5MB in size",
      },
    ),
});
