import type {
  UserProfileData,
  EditableUserProfile,
  UpdateUserProfilePayload,
  UserResponseMe,
  userData
} from "../types/user";

export function mapUserToEditable(
  user: UserProfileData
): EditableUserProfile {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    photo: user.photo ?? null,
    skills: user.skills ?? [],
    description: user.description ?? "",
    accountType: user.role,
  };
}



export function mapUpdateUserToApi(payload: UpdateUserProfilePayload) {
  return {
    nome: payload.name,
    telefone: payload.phone,
    descricao: payload.description,
    fotoUrl: payload.photo,
    tecnologias: payload.skills?.join(","), // backend recebe string
    senha: payload.password,
  };
}

export function mapUserResponseToUserData(
  user: UserResponseMe
): userData {
  return {
    name: user.name,
    email: user.email,
    photo: user.avatar, // avatar → photo
  };
}

