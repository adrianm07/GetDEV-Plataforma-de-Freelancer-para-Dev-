import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
  completePost,
} from "../../services/postService";

import { mapSummaryPostDTOToPost } from "../../mapper/postMapper";
import type { Post , createPostDTO} from "../../types/contract";

import { useAuth } from "../../context/AuthContext";
import { ManagePosts } from "../../components/contracts/ManagePosts";

export function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const { userLogado } = useAuth();

const userData = {
  name: userLogado?.name ?? "",
  email: userLogado?.email ?? "",
  photo: userLogado?.photo ?? null,
};


  // 📡 Fetch inicial
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await getMyPosts(); // SummaryPostDTO[]
      setPosts(data.map(mapSummaryPostDTOToPost));
    } catch {
      toast.error("Erro ao carregar seus posts");
    } finally {
      setLoading(false);
    }
  }

  // ➕ Criar
async function handleCreatePost(payload: createPostDTO) {
  try {
    await createPost(payload);
    toast.success("Post criado com sucesso");
    await loadPosts(); // 🔄 refaz o GET
  } catch {
    toast.error("Erro ao criar post");
  }
}

  // ✏️ Atualizar
  async function handleUpdatePost(id: string, payload: any) {
    try {
      const updated = await updatePost(id, payload);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? mapSummaryPostDTOToPost(updated)
            : post
        )
      );
    } catch {
      toast.error("Erro ao atualizar post");
    }
  }

  // 🗑️ Excluir
  async function handleDeletePost(id: string) {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch {
      toast.error("Erro ao excluir post");
    }
  }

  // ✅ Concluir
  async function handleCompletePost(
    id: string,
    _developerName: string,
    _rating: number,
    _review: string
  ) {
    try {
      await completePost(id);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? { ...post, isCompleted: true }
            : post
        )
      );
    } catch {
      toast.error("Erro ao concluir projeto");
    }
  }

  // ⏳ Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Carregando...
      </div>
    );
  }

   return (
    <ManagePosts
      posts={posts}
      userData={userData}
      onCreatePost={handleCreatePost}
      onUpdatePost={handleUpdatePost}
      onDeletePost={handleDeletePost}
      onCompletePost={handleCompletePost}
    />
  );
}