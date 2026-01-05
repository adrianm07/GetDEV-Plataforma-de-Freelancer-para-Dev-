import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { DeletePostConfirmation } from "./DeletePostConfirmation";
import { RateDeveloper } from "./RateDeveloper";
import { PostFormPanel} from "./PostFormPanel";
import type { PostFormData } from "./PostFormPanel";

interface Post {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  deadline?: string;
  minPrice: number;
  maxPrice: number;
  email: string;
  phone: string;

  contractorName: string;
  contractorPhoto: string | null;

  developerName?: string;
  developerRating?: number;
  developerReview?: string;

  isCompleted?: boolean;
  completedDate?: string;
}

interface ManagePostsProps {
  posts: Post[];
  userData: {
    name: string;
    email: string;
    photo: string | null;
  };
  onCreatePost: (
    post: Omit<Post, "id" | "contractorName" | "contractorPhoto">
  ) => void;
  onUpdatePost: (
    id: number,
    post: Omit<Post, "id" | "contractorName" | "contractorPhoto">
  ) => void;
  onDeletePost: (id: number) => void;
  onCompletePost: (
    id: number,
    developerName: string,
    rating: number,
    review: string
  ) => void;
}

const EMPTY_FORM = (email: string): PostFormData => ({
  title: "",
  description: "",
  fullDescription: "",
  technologies: [],
  deadline: "",
  minPrice: "",
  maxPrice: "",
  email,
  phone: "",
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

  if (!data.email.trim()) return "E-mail é obrigatório";
  if (!data.phone.trim()) return "Telefone é obrigatório";

  return null;
}

function mapFormToPost(data: PostFormData) {
  return {
    title: data.title,
    description: data.description,
    fullDescription: data.fullDescription,
    technologies: data.technologies,
    deadline: data.deadline,
    minPrice: Number(data.minPrice),
    maxPrice: Number(data.maxPrice),
    email: data.email,
    phone: data.phone,
    developerName: data.developerName,
  };
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [formData, setFormData] = useState<PostFormData>(
    EMPTY_FORM(userData.email)
  );

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToRate, setPostToRate] = useState<Post | null>(null);

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
      fullDescription: post.fullDescription || "",
      technologies: post.technologies,
      deadline: post.deadline || "",
      minPrice: post.minPrice.toString(),
      maxPrice: post.maxPrice.toString(),
      email: post.email,
      phone: post.phone,
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

    const payload = mapFormToPost(data);

    if (editingId !== null) {
      onUpdatePost(editingId, payload);
      toast.success("Post atualizado com sucesso!");
    } else {
      onCreatePost(payload);
      toast.success("Post criado com sucesso!");
    }

    closePanel();
  };

  const handleCompleteProject = (post: Post) => {
    if (!post.developerName) {
      toast.error("Adicione o nome do desenvolvedor antes de concluir");
      return;
    }
    setPostToRate(post);
  };

  const handleRemoveDeveloper = (post: Post) => {
    if (post.isCompleted) {
      toast.error("Não é possível remover desenvolvedor de projetos concluídos");
      return;
    }

    onUpdatePost(post.id, {
      ...post,
      developerName: "",
      minPrice: post.minPrice,
      maxPrice: post.maxPrice,
    });

    toast.success("Desenvolvedor removido");
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "active") return !post.isCompleted;
    if (filter === "completed") return post.isCompleted;
    return true;
  });

  const activeCount = posts.filter((p) => !p.isCompleted).length;
  const completedCount = posts.filter((p) => p.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between mb-8">
          <h1 className="text-white">Gerenciar Posts</h1>
          <button
            onClick={openCreatePanel}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-5 h-5" />
            Criar Novo Post
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {[
            { key: "all", label: `Todos (${posts.length})` },
            { key: "active", label: `Em andamento (${activeCount})` },
            { key: "completed", label: `Concluídos (${completedCount})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === key
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`rounded-xl p-6 border ${
                post.isCompleted
                  ? "border-green-900/30 bg-green-900/5"
                  : "border-purple-900/30 bg-gray-900"
              }`}
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
                  <p className="text-gray-400 mb-3">{post.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-purple-900/20 text-purple-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-gray-400 text-sm">
                    💰 R$ {post.minPrice.toLocaleString()} – R${" "}
                    {post.maxPrice.toLocaleString()}
                  </div>
                </div>

                {!post.isCompleted && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCompleteProject(post)}
                      className="text-green-400 hover:underline"
                    >
                      Concluir
                    </button>
                    {post.developerName && (
                      <button
                        onClick={() => handleRemoveDeveloper(post)}
                        className="text-orange-400 hover:underline"
                      >
                        Remover Dev
                      </button>
                    )}
                    <button
                      onClick={() => openEditPanel(post)}
                      className="text-blue-400 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setPostToDelete(post)}
                      className="text-red-400 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panels */}
      <PostFormPanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        onSubmit={handleFormSubmit}
        initialData={formData}
        isEditing={editingId !== null}
      />

      {postToDelete && (
        <DeletePostConfirmation
          isOpen
          postTitle={postToDelete.title}
          onCancel={() => setPostToDelete(null)}
          onConfirm={() => {
            onDeletePost(postToDelete.id);
            toast.success("Post excluído com sucesso");
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
            onCompletePost(
              postToRate.id,
              postToRate.developerName!,
              rating,
              review
            );
            toast.success("Projeto concluído");
            setPostToRate(null);
          }}
        />
      )}
    </div>
  );
}
