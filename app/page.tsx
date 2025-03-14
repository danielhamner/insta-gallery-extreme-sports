'use client';

import { useState } from 'react';
import Image from 'next/image';
import UploadModal from './components/UploadModal';

interface UploadResponse {
  id: string;
  originalUrl: string;
  galleryUrl: string;
  thumbnailUrl: string;
  description: string;
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<UploadResponse | null>(null);

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Extreme Sports Gallery
      </h1>

      <UploadModal onUploadSuccess={setUploadedImage} />

      {uploadedImage && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Upload Successful!</h2>
          <div className="relative w-full aspect-video mb-4">
            <Image
              src={uploadedImage.galleryUrl}
              alt={uploadedImage.description}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <p className="text-green-700">{uploadedImage.description}</p>
        </div>
      )}
    </div>
  );
}