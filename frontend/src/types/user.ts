import type { AccountType } from "./accountType";
import type { Project } from "./project";

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  role: AccountType;
  photo?: string | null;
  skills?: string[];         
  portfolio: Project[];
}

export interface PublicUser {
    name: string,
    email: string,
    photo?: string | null
}

export interface EditableUserProfile {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  accountType: AccountType;
  skills?: string[];
}

export interface UpdateUserProfilePayload {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  skills?: string[];
  password?: string;
}