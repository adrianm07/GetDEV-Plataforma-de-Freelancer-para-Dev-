import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage  from "./pages/profile/ProfilePage";
import PagePost from "./pages/posts/PagePost"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/posts/:id" element={<PagePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
