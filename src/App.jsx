import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import PublicacionDetailPage from "./pages/PublicacionDetailPage/PublicacionDetailPage";
import PublicacionesPage from "./pages/PublicacionesPage/PublicacionesPage";
import CrearPublicacionPage from "./components/CrearPublicacion/CrearPublicacion";
import MisPublicacionesPage from "./pages/MisPublicacionesPage/MisPublicacionesPage";
import EditarPublicacionPage from "./pages/EditarPublicacionPage/EditarPublicacionPage";
import ComentariosPage from "./pages/ComentariosPage/ComentariosPage"; // Importa el componente ComentariosPage
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  return (
    <div className="App">
      <div className="mb-10">
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publicaciones" element={<PublicacionesPage />} />
        <Route path="/publicaciones/:publicacionId" element={<PublicacionDetailPage />} />
        <Route
          path="/comentarios/publicacion/:publicacionId"
          element={
            <IsPrivate>
              <ComentariosPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/publicaciones/nueva"
          element={
            <IsPrivate>
              <CrearPublicacionPage />
            </IsPrivate>
          }
        />
        <Route
          path="/mis-publicaciones"
          element={
            <IsPrivate>
              <MisPublicacionesPage />
            </IsPrivate>
          }
        />
        <Route
          path="/publicaciones/editar/:id"
          element={
            <IsPrivate>
              <EditarPublicacionPage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;