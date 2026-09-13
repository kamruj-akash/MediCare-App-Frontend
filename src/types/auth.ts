export type TUserRegister = {
  name: string;
  email: string;
  password: string;
  patient: {
    contactNumber?: string;
  };
};
