import { Doctor } from "./doctor";

export interface DoctorResponse {
  data: Doctor[];
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
