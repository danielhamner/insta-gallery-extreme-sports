import { Dialog, DialogContent } from "@/app/components/ui/dialog";

import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    url: string;
    description: string;
  } | null;
}

export default function ImageModal({
  isOpen,
  onClose,
  image,
}: ImageModalProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-gray-900/95 border-none overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 rounded-full p-3 sm:p-2 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-pink-500/25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 sm:h-6 sm:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="relative w-full h-[85vh] md:h-[90vh]">
          <Image
            src={image.url}
            alt={image.description}
            fill
            className="object-contain"
            sizes="95vw"
            priority
            quality={90}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6">
            <p className="text-white text-base md:text-lg font-medium">
              {image.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
