import { useEffect, useState } from "react";
import { UserProfile } from "../../components/profile/UserProfile";
import { EditProfile } from "../../components/profile/EditProfile";
import type { UserProfileData, UpdateUserProfilePayload } from "../../types/user";
import { getUserById, updateUserProfile } from "../../services/userService";
import{mapUserToEditable} from "../../mapper/userMapper"
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";



export default function ProfilePage() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {userLogado} = useAuth();

  async function loadUser() {
    try {
      setLoading(true);

      const user = await getUserById(userLogado?.id);
      setUser(user);
      
    } catch (error: any) {
      toast.error(error?.response?.data ?? "Erro ao buscar usuário!", {
        duration: 2000,
        position: "bottom-right"
      });
      
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
    } catch(error: any) {
      toast.error(error?.response?.data ?? "Dados inseridos inválidos!", {
        duration: 2000,
        position: "bottom-right"
      });
    }
  };

  if (loading) return <div>Carregando...</div>;
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

