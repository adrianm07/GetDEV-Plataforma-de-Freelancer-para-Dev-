import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ManagePosts } from "../../components/contracts/ManagePosts";
import type { Post } from "../../types/contract";
import type { PostFormData } from "../../components/contracts/PostFormPanel";
import { createPost, deletePost, listarPostsContratante } from "../../services/postService";
import { mapFormToCreatePostDTO, mapPostResponseToPost } from "../../mapper/postMapper";



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

  async function handleCreatePost(data: PostFormData) {
      try{
        const mapped = mapFormToCreatePostDTO(data);
        await createPost(mapped);
        await loadPosts();
        toast.success("Post criado com sucesso!");
      }
      catch(error){
        console.error("Erro ao criar post");
      }
  }

  function handleUpdatePost(id: number, data: PostFormData) {
    // chamar backend
    // atualizar estado
  }

  async function handleDeletePost(id: string) {
  try {
    await deletePost(id)

    setPosts(prevPosts =>
      prevPosts.filter(post => post.id !== id)
    )
  } catch (error) {
    console.error(error)
    alert('Erro ao deletar post')
  }
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
