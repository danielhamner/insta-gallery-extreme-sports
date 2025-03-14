"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

import { EXTREME_SPORT_TAG } from '../constants';
import { GalleryImage } from "../types/gallery";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

type ErrorWithMessage = {
  message: string;
  toString(): string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

interface UploadModalProps {
  onUploadSuccess: (image: GalleryImage) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({
  onUploadSuccess,
  isOpen,
  onClose,
}: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelect(file);
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage || !uploadedBy.trim()) {
      setError("Please provide both an image and your name");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append(
        "metadata",
        JSON.stringify({
          description,
          uploaded_by: uploadedBy,
        })
      );

      const uploadResponse = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      // Try to get the ID from the response, fall back to temp ID if parsing fails
      let imageId;
      try {
        const responseData = await uploadResponse.json();
        console.log('Upload response:', responseData);
        imageId = responseData.id;
      } catch (parseError) {
        console.warn('Failed to parse upload response:', parseError);
      }

      // Try to add the tag
      try {
        await fetch('/api/images/tags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageId: imageId,
            tags: [EXTREME_SPORT_TAG]
          })
        });
      } catch (tagError) {
        // Ignore tag errors
        console.warn('Failed to add tags:', tagError);
      }

      onUploadSuccess({
        id: imageId,
        original_url: '',
        gallery_url: '',
        thumbnail_url: '',
        description: description || '',
        uploaded_by: uploadedBy,
        created_at: new Date().toISOString()
      });
      
      // Clear form and close modal
      setDescription("");
      setUploadedBy("");
      setSelectedImage(null);
      setPreview(null);
      setError(null);
      onClose();
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setError(
        isErrorWithMessage(err)
          ? err.message
          : "Failed to upload image. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border border-gray-800 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-audiowide bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Upload Your Extreme Sports Moment
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          onDragEnter={handleDrag}
        >
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? "border-purple-500 bg-purple-500/10"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageSelect(file);
              }}
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              {preview ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="py-12">
                  <p className="text-gray-400">
                    Drag and drop your image here, or click to select
                  </p>
                </div>
              )}
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="uploadedBy"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="uploadedBy"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
                rows={3}
                placeholder="Describe your extreme sports moment..."
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-md text-white font-medium bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedImage || uploading || !uploadedBy.trim()}
              className={`flex-1 py-3 px-4 rounded-md text-white font-medium relative ${
                !selectedImage || uploading || !uploadedBy.trim()
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              }`}
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>

          {uploading && (
            <div className="mt-4 p-4 bg-purple-900/20 border border-purple-800 rounded-md text-purple-300">
              Uploading your image... Please wait.
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-md text-red-300">
              {error}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
