"use client";

import Gallery from "./components/Gallery";
import Header from "./components/Header";
import OminousTerminal from "./components/OminousTerminal";
import UploadModal from "./components/UploadModal";
import { useState } from "react";

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadSuccess = () => {
    // Refresh the page to show new images
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />

      <Gallery />

      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="fixed bottom-8 right-8 z-10 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        <span>Upload</span>
      </button>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      <OminousTerminal />
    </main>
  );
}
