import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage";
import PagePost from "./pages/posts/PagePost";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { AppLayout } from "./layout/AppLayout";
import { NotificationProvider } from "./context/NotificationContext";
import { SolicitacoesPage } from "./pages/solicitacoes/SolicitacoesPage";
import { MyPostsPage } from "./pages/posts/MeusPostsPage";
import Home from "./pages/posts/Home";
import { Toaster } from "sonner"; // <-- importando Toaster

function App() {
  return (
    <AuthProvider>
      {/* Adicione o Toaster aqui */}
      <Toaster position="bottom-right" richColors />

      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Rotas Privadas */}
          <Route
            element={
              <NotificationProvider>
                <AppLayout />
              </NotificationProvider>
            }
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/posts/:id" element={<PagePost />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/solicitacoes" element={<SolicitacoesPage />} />
            <Route path="/managePosts" element={<MyPostsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
