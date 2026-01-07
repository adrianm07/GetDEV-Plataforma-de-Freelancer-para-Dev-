import { api } from "./api";
import type { UserProfileData, UpdateUserProfilePayload } from "../types/user";
import { mapUpdateUserToApi } from "../mapper/userMapper";

export async function getUserById(
  userId: string
): Promise<UserProfileData> {
  const response = await api.get<UserProfileData>(`/users/${userId}`);
  return response.data;
}

export async function updateUserProfile(
  userId: string,
  payload: UpdateUserProfilePayload
): Promise<void> {
  const body = mapUpdateUserToApi(payload);
  await api.put(`/users/${userId}`, body);
}