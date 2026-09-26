export type TUserRegister = {
  name: string;
  email: string;
  password: string;
  patient: {
    contactNumber?: string;
  };
};

export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT" | "SUPER_ADMIN";
