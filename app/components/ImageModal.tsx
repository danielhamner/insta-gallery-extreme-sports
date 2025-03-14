import { Dialog, DialogContent } from "@/app/components/ui/dialog";

import Image from "next/image";
import { GalleryImage } from '../types/gallery';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: GalleryImage | null;
}

export default function ImageModal({
  isOpen,
  onClose,
  image,
}: ImageModalProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-gray-900 border border-gray-800 p-0 overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={image.original_url}
            alt={image.description || 'Gallery image'}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="p-6 bg-gray-900">
          <p className="text-gray-300 text-sm mb-2">
            By {image.uploaded_by}
          </p>
          {image.description && (
            <p className="text-white text-lg mb-2">{image.description}</p>
          )}
          <p className="text-gray-400 text-xs">
            {new Date(image.created_at).toLocaleDateString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
