import { User } from "./user";

export interface applyAsDoctorData {
  email: string;
  otp: string;
  specialization: string;
  licenseNumber: string;
  qualification: string;
  expYear: number;
  bio: string;
  consultationFee: string;
  contactNumber: string;
}
export interface applyAsDoctorPayload {
  body: applyAsDoctorData;
  resume: File;
  additionalFiles: File[];
}

export type DoctorVerificationStatus = "PENDING" | "APPROVE" | "REJECTED";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  qualification?: string;
  expYear: number;
  bio: string;
  consultationFee: string;
  contactNumber?: string;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string;
  reviewedBy: string;
  reviewedAt: string;
  resume?: string;
  additionalFiles?: string[];
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface GetAllDoctorsParams {
  page?: number;
  limit?: number;
  totalPages?: number;
  total?: number;
  search?: string;
  status?: DoctorVerificationStatus;
  searchTerm?: string;
}
