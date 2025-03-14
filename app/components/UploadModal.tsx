'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';

interface UploadResponse {
  id: string;
  originalUrl: string;
  galleryUrl: string;
  thumbnailUrl: string;
  description: string;
}

type ErrorWithMessage = {
  message: string;
  toString(): string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

interface UploadModalProps {
  onUploadSuccess: (image: UploadResponse) => void;
}

export default function UploadModal({ onUploadSuccess }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    if (file && file.type.startsWith('image/')) {
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
      setError('Please provide both an image and your name');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('metadata', JSON.stringify({
        description,
        uploadedBy
      }));

      const response = await fetch('https://wkuhfuofhpjuwilhhtnj.supabase.co/functions/v1/upload-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      // Clear the form
      setDescription('');
      setUploadedBy('');
      setSelectedImage(null);
      setPreview(null);
      setError(null);
      setIsOpen(false);

      try {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${errorText || response.statusText}`);
        }

        const data = await response.json();
        if (data && 'galleryUrl' in data) {
          onUploadSuccess(data as UploadResponse);
        }
      } catch (parseError: unknown) {
        const errorMessage = getErrorMessage(parseError).toLowerCase();
        if (!errorMessage.includes('cors') && !errorMessage.includes('network')) {
          throw parseError;
        }
        onUploadSuccess({
          id: 'unknown',
          originalUrl: '',
          galleryUrl: '',
          thumbnailUrl: '',
          description: description || ''
        });
      }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err).toLowerCase();
      if (!errorMessage.includes('cors') && !errorMessage.includes('network')) {
        console.error('Upload error:', err);
        setError(isErrorWithMessage(err) ? err.message : 'Failed to upload image. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Upload</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Your Extreme Sports Moment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6" onDragEnter={handleDrag}>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
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
            <label
              htmlFor="image-upload"
              className="cursor-pointer block"
            >
              {preview ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="py-12">
                  <p className="text-gray-500">
                    Drag and drop your image here, or click to select
                  </p>
                </div>
              )}
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="uploadedBy" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="uploadedBy"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Describe your extreme sports moment..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedImage || uploading || !uploadedBy.trim()}
            className={`w-full py-3 px-4 rounded-md text-white font-medium relative ${
              !selectedImage || uploading || !uploadedBy.trim()
                ? 'bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload Image'
            )}
          </button>

          {uploading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-600">
              Uploading your image... Please wait.
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
} 