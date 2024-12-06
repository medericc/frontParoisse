"use client";

import { useState } from "react";
import { useAuth } from "./context/AuthContext"; // Importation du hook personnalisé pour l'authentification
import CreateArticleModal from "./components/CreateArticleModal";
import AuthModal from "./components/AuthModal";

export default function HomePage() {
  const { isLoggedIn, username } = useAuth(); // Utilisation du contexte d'authentification
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFabClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        {isLoggedIn ? `Bienvenue, ${username}` : "Bienvenue sur le site de la paroisse"}
      </h1>
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        onClick={handleFabClick}
      >
        +
      </button>
      {isModalOpen && (
        isLoggedIn ? (
          <CreateArticleModal closeModal={closeModal} />
        ) : (
          <AuthModal closeModal={closeModal} />
        )
      )}
    </div>
  );
}
