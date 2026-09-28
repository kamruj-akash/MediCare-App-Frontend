export interface DoctorSchedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  totalSlot: number;
  availableSlot: number;
  meetingLink: string;
  status: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  doctorId: string;
  Appointments: Appointment[];
}

export interface Appointment {
  id: string;
  status: string;
  joiningTime: string;
  serialNumber: number;
  recordUrl?: string[];
  prescriptionUrl: PrescriptionUrl;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  createdAt: string;
  updatedAt: string;
  Patient: Patient;
}

export interface PrescriptionUrl {
  url: string;
  publicId: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
