"use client";

import Gallery from "./components/Gallery";
import Header from "./components/Header";
import OminousTerminal from "./components/OminousTerminal";
import UploadButton from "./components/UploadButton";
import UploadModal from "./components/UploadModal";
import { useState } from "react";

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadSuccess = () => {
    // Refresh the page to show new images
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      <Gallery />
      <UploadButton onClick={() => setIsUploadModalOpen(true)} />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      <OminousTerminal />
    </main>
  );
}
