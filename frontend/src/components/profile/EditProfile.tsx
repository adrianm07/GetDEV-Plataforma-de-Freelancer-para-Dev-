"use client";

import { useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import type {
  EditableUserProfile,
  UpdateUserProfilePayload,
} from "../../types/user";

const AVAILABLE_SKILLS = [
  "React", "Vue.js", "Angular", "Next.js", "TypeScript", "JavaScript",
  "HTML/CSS", "Tailwind CSS", "Bootstrap", "Redux",
  "Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust",
  "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET",
  "React Native", "Flutter", "Swift", "Kotlin", "Ionic",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase",
].sort();

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userData: EditableUserProfile;
  onSave: (data: UpdateUserProfilePayload) => void;
}

export function EditProfile({
  isOpen,
  onClose,
  userData,
  onSave,
}: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    photo: userData.photo,
    newPassword: "",
    confirmPassword: "",
  });

  const [skills, setSkills] = useState<string[]>(userData.skills ?? []);
  const [selectedSkill, setSelectedSkill] = useState("");

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills((prev) => [...prev, selectedSkill]);
      setSelectedSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("As senhas não coincidem");
      return;
    }

    const payload: UpdateUserProfilePayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      photo: formData.photo,
      skills: userData.accountType === "developer" ? skills : undefined,
      ...(formData.newPassword && { password: formData.newPassword }),
    };

    onSave(payload);
    onClose();
  };

  const availableSkills = AVAILABLE_SKILLS.filter(
    (skill) => !skills.includes(skill),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-purple-800/50 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Label className="mb-3">Foto de Perfil</Label>

            <div className="relative">
              <Avatar className="size-32 border-4 border-purple-600">
                <AvatarImage src={formData.photo ?? undefined} />
                <AvatarFallback>
                  {userData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <Upload className="absolute bottom-2 right-2 w-6 h-6 text-purple-400 bg-black rounded-full p-1" />
            </div>
          </div>

          {/* Nome */}
          <div>
            <Label>Nome completo *</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Tipo */}
          <div>
            <Label>Tipo de conta</Label>
            <Input
              disabled
              value={
                userData.accountType === "developer"
                  ? "Desenvolvedor"
                  : "Contratante"
              }
            />
          </div>

          {/* Telefone */}
          <div>
            <Label>Telefone *</Label>
            <Input
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: formatPhone(e.target.value),
                })
              }
              maxLength={15}
            />
          </div>

          {/* Senha */}
          <div>
            <Label>Nova senha</Label>
            <Input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
            />
          </div>

          {formData.newPassword && (
            <div>
              <Label>Confirmar nova senha</Label>
              <Input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          )}

          {/* Skills */}
          {userData.accountType === "developer" && (
            <div>
              <Label>Habilidades</Label>

              <div className="flex gap-2 mt-2">
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar habilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button type="button" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-900/30"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} type="button">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar alterações</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
