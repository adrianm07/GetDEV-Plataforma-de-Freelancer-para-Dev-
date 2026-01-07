import { useEffect, useState } from "react";
import { UserProfile } from "../../components/profile/UserProfile";
import { EditProfile } from "../../components/profile/EditProfile";

import type { UserProfileData, UpdateUserProfilePayload } from "../../types/user";
import type { Project } from "../../types/project";

import {
  getUserById,
  updateUserProfile,
} from "../../services/userService";

import{mapUserToEditable} from "../../mapper/userMapper"

// ID de quem to buscando
const FIXED_USER_ID = "ab297627-3406-4f5b-9b8b-4707fe722484";

export function ProfilePage() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);


  //ID do cara logado
  const loggedUserId = "ab297627-3406-4f5b-9b8b-4707fe722484";

  async function loadUser() {
    try {
      setLoading(true);
      const data = await getUserById(FIXED_USER_ID);
      setUser(data);
    } catch {
      setError("Não foi possível carregar o perfil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  const handleSaveProfile = async (
    payload: UpdateUserProfilePayload
  ) => {
    if (!user) return;

    try {
      await updateUserProfile(user.id, payload);

      // 🔥 backend não retorna nada → recarrega o usuário
      await loadUser();
    } catch {
      alert("Erro ao atualizar perfil");
    }
  };

  const handleProjectClick = (project: Project) => {
    console.log("Projeto clicado:", project);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <>
      <UserProfile
        user={user}
        canEdit={user.id === loggedUserId}
        onEditProfile={handleEditProfile}
        onProjectClick={handleProjectClick}
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
