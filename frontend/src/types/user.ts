import type { AccountType } from "./accountType";
import type {SummaryPost } from "./project";

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  phone: string,
  description?: string,
  role: AccountType;
  photo?: string | null;
  skills?: string[];         
  posts: SummaryPost[];
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
description?: string;
  photo: string | null;
  accountType: AccountType;
  skills?: string[];

}

export interface UpdateUserProfilePayload {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  description?: string;
  skills?: string[];
  password?: string;
}