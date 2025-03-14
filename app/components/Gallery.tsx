'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GalleryResponse, GalleryImage } from '../types/gallery';
import ImageModal from './ImageModal';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data: GalleryResponse = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
        console.error('Error fetching images:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No images found. Be the first to upload!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="tap-highlight-none"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-gray-800 group cursor-pointer">
              <Image
                src={image.gallery_url}
                alt={image.description || 'Gallery image'}
                fill
                className="object-cover transition-all duration-300 scale-100 blur-0 group-hover:scale-110 brightness-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 16.67vw"
                priority={index < 6}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                <div className="p-4 w-full">
                  <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.description}
                  </p>
                  <p className="text-gray-300 text-xs mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    By {image.uploaded_by}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </>
  );
}
