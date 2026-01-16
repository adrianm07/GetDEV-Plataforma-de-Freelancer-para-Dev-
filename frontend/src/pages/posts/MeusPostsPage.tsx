import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ManagePosts } from "../../components/contracts/ManagePosts";
import type { Post } from "../../types/contract";
import type { PostFormData } from "../../components/contracts/PostFormPanel";
import {
  completePost,
  createPost,
  deletePost,
  enviarAvaliacao,
  listarPostsContratante,
  updatePost,
} from "../../services/postService";
import {
  mapFormToCreatePostDTO,
  mapFormToUpdatePostDTO,
  mapPostResponseToPost,
} from "../../mapper/postMapper";
import { useAuth } from "../../context/AuthContext";

export function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const location = useLocation();
  const { userLogado, loading } = useAuth();

  /* ================= LOAD POSTS ================= */

  async function loadPosts() {
    if (!userLogado) return;

    setLoadingPosts(true);
    try {
      const data = await listarPostsContratante();
      setPosts(data.map(mapPostResponseToPost));
    } catch {
      toast.error("Erro ao carregar posts");
    } finally {
      setLoadingPosts(false);
    }
  }

  useEffect(() => {
    if (!loading && userLogado) {
      loadPosts();
    }
  }, [location.pathname, userLogado, loading]);

  /* ================= HANDLERS ================= */

async function handleCreatePost(data: PostFormData) {
  try {
    await createPost(mapFormToCreatePostDTO(data));
    await loadPosts();
    toast.success("Post criado com sucesso!");
  } catch (error: any) {
    toast.error(error?.response?.data ?? "Erro ao criar post",{
      duration: 2000,
      position: "bottom-right"
    });
  }
}

async function handleUpdatePost(id: string, data: PostFormData) {
  try {
    await updatePost(id, mapFormToUpdatePostDTO(data));
    await loadPosts();
    toast.success("Post atualizado!");
  } catch (error: any) {
    toast.error(error?.response?.data ?? "Erro ao editar post",{
      duration: 2000,
      position: "bottom-right"
    });
  }
}

async function handleDeletePost(id: string) {
  try {
    await deletePost(id);
    setPosts(prev => prev.filter(post => post.id !== id));
    toast.success("Post removido com sucesso!");
  } catch (error: any) {
    toast.error(error?.response?.data ?? "Erro ao deletar post",{
      duration: 2000,
      position: "bottom-right"
    });
  }
}

async function handleCompletePost(
  postId: string,
  rating: number,
  review: string
) {
  try {
    await enviarAvaliacao(postId, rating, review);
    await completePost(postId);

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, status: "CONCLUIDO", nota: rating }
          : post
      )
    );

    toast.success("Projeto concluído!");
  } catch (error: any) {
    toast.error(error?.response?.data ?? "Erro ao concluir post",{
      duration: 2000,
      position: "bottom-right"
    });
  }
}


  /* ================= RENDER ================= */

  if (loading || loadingPosts || !userLogado) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Carregando...
      </div>
    );
  }

  return (
    <ManagePosts
      posts={posts}
      userData={{
        name: userLogado.name,
        email: userLogado.email,
        photo: userLogado.avatar,
      }}
      onCreatePost={handleCreatePost}
      onUpdatePost={handleUpdatePost}
      onDeletePost={handleDeletePost}
      onCompletePost={handleCompletePost}
    />
  );
}
