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
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-gray-900/95 border-none">
        <div className="relative w-full h-[90vh]">
          <Image
            src={image.url}
            alt={image.description}
            fill
            className="object-contain"
            sizes="95vw"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <p className="text-white text-lg font-medium">
              {image.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
