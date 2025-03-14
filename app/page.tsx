"use client";

import Gallery from "./components/Gallery";
import UploadModal from "./components/UploadModal";
import { useState } from "react";

interface UploadResponse {
  id: string;
  originalUrl: string;
  galleryUrl: string;
  thumbnailUrl: string;
  description: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUploadSuccess = (data: UploadResponse) => {
    setShowSuccess(true);
    setIsModalOpen(false);
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };
  const [uploadedImage, setUploadedImage] = useState<UploadResponse | null>(
    null
  );

  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold p-8 text-center">
        Extreme Sports Gallery
      </h1>
      <Gallery />
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {showSuccess && (
        <div className="fixed bottom-20 right-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-800 shadow-lg animate-fade-in-up">
          Image uploaded successfully!
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
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
    </main>
  );
}
