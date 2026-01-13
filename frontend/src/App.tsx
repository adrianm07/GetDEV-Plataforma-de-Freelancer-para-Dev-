import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage  from "./pages/profile/ProfilePage";
import PagePost from "./pages/posts/PagePost"
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import Home from "./pages/posts/Home"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Publicas */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          
          {/*Rotas Privadas */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts/:id" element={<PagePost />} />
          <Route path="/posts" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
