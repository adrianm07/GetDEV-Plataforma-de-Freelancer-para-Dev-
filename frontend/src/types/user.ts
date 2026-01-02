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