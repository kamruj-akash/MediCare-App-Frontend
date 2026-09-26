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
