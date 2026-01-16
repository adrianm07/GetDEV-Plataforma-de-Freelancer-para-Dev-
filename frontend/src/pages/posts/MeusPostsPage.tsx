import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ManagePosts } from "../../components/contracts/ManagePosts";
import type { Post } from "../../types/contract";
import type { PostFormData } from "../../components/contracts/PostFormPanel";
import { completePost, createPost, deletePost, enviarAvaliacao, enviarSolicitacao, listarPostsContratante, updatePost } from "../../services/postService";
import { mapFormToCreatePostDTO, mapFormToPostUpdate, mapFormToUpdatePostDTO, mapPostResponseToPost } from "../../mapper/postMapper";
import { getLoggedUser } from "../../services/auth.service";



export function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const userData = getLoggedUser();

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

 async function handleUpdatePost(id: string, data: PostFormData) {
  try {
    await updatePost(id, mapFormToUpdatePostDTO(data));

    setPosts(prev =>
  prev.map(post =>
    post.id === id
      ? mapFormToPostUpdate(data, post)
      : post
  )
);

    toast.success("Post atualizado com sucesso!");
  } catch (error) {
    toast.error("Erro ao atualizar post");
    console.error(error);
  }
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

async  function handleCompletePost(
    postId: string,
    rating: number,
    review :string
  ) {
    try{
      await enviarAvaliacao(postId, rating, review);
      await completePost(postId)

      toast.success("Projeto concluido e avaliado com sucesso!");

      setPosts(prev =>
      prev.map(post =>
      post.id === postId
      ? { ...post, status: "CONCLUIDO", nota: rating }
      : post
  )
);

    }
    catch(error){
      toast.error("Erro ao concluir o projeto")
      console.error(error)
    }
  
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
