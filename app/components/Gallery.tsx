import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  id: string;
  url: string;
  description: string;
}

const mockImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=800&q=80",
    description: "Snowboarder jumping through the air",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    description: "Mountain biker on a trail",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80",
    description: "Skier in the mountains",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    description: "Rock climber scaling a cliff",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=800&q=80",
    description: "Surfer riding a wave",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1583123810408-23e7b5d1af9f?auto=format&fit=crop&w=800&q=80",
    description: "Skateboarder in action",
  },
];

function GalleryImage({ image }: { image: GalleryImage }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-gray-800 group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={image.url}
        alt={image.description}
        width={800}
        height={800}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading
            ? "scale-110 blur-sm"
            : "scale-100 blur-0 group-hover:scale-110 brightness-90"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 16.67vw"
        priority={parseInt(image.id) <= 3}
        onLoadingComplete={() => setIsLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
        <p className="text-white p-4 text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {image.description}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6">
      {mockImages.map((image) => (
        <GalleryImage key={image.id} image={image} />
      ))}
    </div>
  );
}
