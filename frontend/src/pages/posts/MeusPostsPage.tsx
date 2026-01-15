import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ManagePosts } from "../../components/contracts/ManagePosts";
import type { Post } from "../../types/contract";
import type { PostFormData } from "../../components/contracts/PostFormPanel";
import { listarPostsContratante } from "../../services/postService";
import { mapPostResponseToPost } from "../../mapper/postMapper";



export function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const userData = {
    name: "Usuário",
    email: "user@email.com",
    photo: null,
  };

  async function loadPosts() {
     setLoading(true);
     try{
        const data = await listarPostsContratante();
        const mapped = data.map(mapPostResponseToPost);
        setPosts(mapped);

     }catch(error){

     }finally{
        setLoading(false);
     }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleCreatePost(data: PostFormData) {
    // chamar backend
    // atualizar estado
  }

  function handleUpdatePost(id: number, data: PostFormData) {
    // chamar backend
    // atualizar estado
  }

  function handleDeletePost(id: number) {
    // chamar backend
    // remover do estado
  }

  function handleCompletePost(
    id: number,
    developerName: string,
    rating: number,
    review: string
  ) {
    // chamar backend
    // marcar como concluído
  }

  /* ========================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Carregando posts...
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
