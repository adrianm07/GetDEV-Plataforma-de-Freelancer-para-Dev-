import { useEffect, useState } from "react";
import { UserProfile } from "../../components/profile/UserProfile";
import { EditProfile } from "../../components/profile/EditProfile";

import type { UserProfileData, UpdateUserProfilePayload } from "../../types/user";
import type { SummaryPost } from "../../types/project";

import {
  getUserById,
  updateUserProfile,
} from "../../services/userService";

import { getLoggedUser } from "../../services/auth.service";

import{mapUserToEditable} from "../../mapper/userMapper"
import { useAuth } from "../../context/AuthContext";



export default function ProfilePage() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {userLogado} = useAuth();

  async function loadUser() {
    try {
      setLoading(true);

      console.log("AAAAAAAAAAAAAAAA");
      console.log(userLogado?.id);
      const user = await getUserById(userLogado?.id);
      setUser(user);
      
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Sessão expirada");
      }
    } finally {
      setLoading(false);
    }
  }

 useEffect(() => {
  if (!userLogado?.id) return;
  loadUser();
}, [userLogado]);

  const handleSaveProfile = async (
    payload: UpdateUserProfilePayload
  ) => {
    if (!user) return;

    try {
      await updateUserProfile(user.id, payload);
      await loadUser();
      setIsEditOpen(false);
    } catch {
      alert("Erro ao atualizar perfil");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <>
      <UserProfile
        user={user}
        canEdit
        onEditProfile={() => setIsEditOpen(true)}
      />

      <EditProfile
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userData={mapUserToEditable(user)}
        onSave={handleSaveProfile}
      />
    </>
  );
}

