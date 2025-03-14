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
  const [uploadedImage, setUploadedImage] = useState<UploadResponse | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadSuccess = (image: UploadResponse) => {
    setUploadedImage(image);
    setIsModalOpen(false);
    // Hide success message after 3 seconds
    setTimeout(() => setUploadedImage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="flex items-center justify-center gap-3 p-8">
        <svg
          className="w-12 h-12 text-purple-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L4 6V12M12 2L20 6V12M12 2V8M4 12L12 16M4 12V18L12 22M12 16L20 12M12 16V22M20 12V18L12 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
          <path
            d="M15 9L9 15M9 9L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-300"
          />
        </svg>
        <h1 className="font-audiowide text-5xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Extreme Sports Gallery
        </h1>
      </div>

      <Gallery />

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {uploadedImage && (
        <div className="fixed top-4 right-4 max-w-sm p-4 bg-green-900/80 backdrop-blur border border-green-700 rounded-md shadow-lg">
          <p className="text-green-100">Image uploaded successfully!</p>
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white w-14 h-14 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </main>
  );
}
