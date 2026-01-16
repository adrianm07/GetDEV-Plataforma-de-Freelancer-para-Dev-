import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { DeletePostConfirmation } from "./DeletePostConfirmation";
import { RateDeveloper } from "./RateDeveloper";
import { PostFormPanel } from "./PostFormPanel";
import type { PostFormData } from "./PostFormPanel";
import type { Post } from "../../types/contract";
import type { userData } from "../../types/user";
import { Button } from "../ui/button";
import { deleteDevAceito } from "../../services/postService";

interface ManagePostsProps {
  posts: Post[];
  userData: userData;
  onCreatePost: (post: PostFormData) => void;
  onUpdatePost: (id: string, post: PostFormData) => void;
  onDeletePost: (id: string) => void;
  onCompletePost: (
    id: string,
    rating: number,
    review: string
  ) => Promise<void>;
}

const EMPTY_FORM = (email: string): PostFormData => ({
  title: "",
  description: "",
  fullDescription: "",
  technologies: [],
  deadline: "",
  minPrice: "",
  maxPrice: "",
  developerName: "",
});

function validatePostForm(data: PostFormData): string | null {
  if (!data.title.trim()) return "Título é obrigatório";
  if (!data.description.trim()) return "Descrição breve é obrigatória";
  if (data.technologies.length === 0)
    return "Selecione pelo menos uma tecnologia";

  const min = Number(data.minPrice);
  const max = Number(data.maxPrice);

  if (isNaN(min) || min < 0) return "Preço mínimo inválido";
  if (isNaN(max) || max < 0) return "Preço máximo inválido";
  if (max < min)
    return "Preço máximo deve ser maior ou igual ao mínimo";

  return null;
}

export function ManagePosts({
  posts,
  userData,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onCompletePost,
}: ManagePostsProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [filter, setFilter] = useState<"active" | "completed">("active");

  const [formData, setFormData] = useState<PostFormData>(
    EMPTY_FORM(userData.email)
  );

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToRate, setPostToRate] = useState<Post | null>(null);

  const filteredPosts = posts.filter(post =>
    filter === "active" ? !post.isCompleted : post.isCompleted
  );

  const activeCount = posts.filter(p => !p.isCompleted).length;
  const completedCount = posts.filter(p => p.isCompleted).length;

  const openCreatePanel = () => {
    setFormData(EMPTY_FORM(userData.email));
    setEditingId(null);
    setIsPanelOpen(true);
  };

  const openEditPanel = (post: Post) => {
    if (post.isCompleted) {
      toast.error("Não é possível editar projetos concluídos");
      return;
    }

    setFormData({
      title: post.title,
      description: post.description,
      fullDescription: post.description || "",
      technologies: post.technologies,
      deadline: post.deadline || "",
      minPrice: post.minPrice?.toString() ?? "",
      maxPrice: post.maxPrice?.toString() ?? "",
      developerName: post.developerName || "",
    });

    setEditingId(post.id);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingId(null);
  };

  const handleFormSubmit = (data: PostFormData) => {
    const error = validatePostForm(data);
    if (error) {
      toast.error(error);
      return;
    }

    editingId ? onUpdatePost(editingId, data) : onCreatePost(data);
    closePanel();
  };

  const handleCompleteProject = (post: Post) => {
    if (!post.developerName) {
      toast.error("Adicione o nome do desenvolvedor antes de concluir");
      return;
    }
    setPostToRate(post);
  };

  const handleRemoveDeveloper = async (post: Post) => {
    try {
      await deleteDevAceito(post.id);
      toast.success("Desenvolvedor removido");
    } catch (error: any) {
      toast.error(error?.response?.data ?? "Erro ao remover desenvolvedor");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl font-semibold">
            Gerenciar Posts
          </h1>
          <button
            onClick={openCreatePanel}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-5 h-5" />
            Criar Novo Post
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg ${
              filter === "active"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Em andamento ({activeCount})
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg ${
              filter === "completed"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Concluídos ({completedCount})
          </button>
        </div>

        {/* POSTS */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="rounded-xl p-6 border border-purple-900/30 bg-gray-900"
            >
              <div className="flex gap-4">
                <Avatar className="size-14 border-2 border-purple-600">
                  <AvatarImage src={post.contractorPhoto ?? undefined} />
                  <AvatarFallback>
                    {post.contractorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="text-white mb-1">{post.title}</h3>
                  <p className="text-gray-400 mb-2">{post.description}</p>

                  {/* 💰 PREÇOS (AQUI QUE TINHA SUMIDO) */}
                  <p className="text-sm text-purple-300">
                    Orçamento: R$
                    {post.minPrice?.toLocaleString("pt-BR")} – R$
                    {post.maxPrice?.toLocaleString("pt-BR")}
                  </p>
                </div>

                {/* BOTÕES SÓ PARA ATIVOS */}
                {!post.isCompleted && (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleCompleteProject(post)}
                    >
                      Concluir
                    </Button>

                    {post.developerName && (
                      <Button
                        className="bg-orange-400"
                        onClick={() => handleRemoveDeveloper(post)}
                      >
                        Remover Dev
                      </Button>
                    )}

                    <Button
                      className="bg-blue-500"
                      onClick={() => openEditPanel(post)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => setPostToDelete(post)}
                    >
                      Excluir
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PostFormPanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        onSubmit={handleFormSubmit}
        initialData={formData}
        isEditing={!!editingId}
      />

      {postToDelete && (
        <DeletePostConfirmation
          isOpen
          postTitle={postToDelete.title}
          onCancel={() => setPostToDelete(null)}
          onConfirm={() => {
            onDeletePost(postToDelete.id);
            setPostToDelete(null);
          }}
        />
      )}

      {postToRate && (
        <RateDeveloper
          isOpen
          projectTitle={postToRate.title}
          developerName={postToRate.developerName!}
          onClose={() => setPostToRate(null)}
          onSubmit={(rating, review) => {
            onCompletePost(postToRate.id, rating, review);
            toast.success("Projeto concluído");
            setPostToRate(null);
          }}
        />
      )}
    </div>
  );
}
