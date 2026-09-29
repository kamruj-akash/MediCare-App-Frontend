import { Doctor } from "./doctor";
import { DoctorSchedule } from "./schedule";

export interface DoctorResponse {
  data: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DoctorScheduleResponse {
  data: DoctorSchedule[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}
