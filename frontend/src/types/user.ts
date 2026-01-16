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
    nome: string,
    email: string,
    fotoUrl?: string | null;
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

export interface RegisterRequest {
  nome: string;
  senha: string;
  email: string;
  telefone: string;
  fotoUrl?: string | null;
  tipoUsuario: AccountType;
}

export interface UserResponseMe {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface userData {
    name: string;
    email: string;
    photo: string | null;
  };
