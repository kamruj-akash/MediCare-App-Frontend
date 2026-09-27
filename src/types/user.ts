export interface User {
  id: string;
  name: string;
  email: string;
  googleId?: string;
  authProvider: string;
  emailVerified: boolean;
  role: string;
  status: string;
  needPasswordChange: boolean;
  phoneNo?: string;
  profileImage?: string;
  imagePublicId?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}
