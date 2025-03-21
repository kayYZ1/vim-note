import { useRef } from "react";

import { db } from "@/lib/db";

interface UploadOptions {
  maxFileSize?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  onError?: (message: string) => void;
}

export function useImageUpload({
  maxFileSize = 2 * 1024 * 1024, //2mb
  maxWidth = 800,
  maxHeight = 600,
  quality = 0.3,
  onError = console.error,
}: UploadOptions = {}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image using canvas
  const compressImage = async (base64String: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
    });
  };

  // Insert image markdown at cursor position
  const insertImageAtCursor = (
    content: string,
    cursorPosition: number,
    imageMarkdown: string,
  ): string => {
    return (
      content.substring(0, cursorPosition) +
      imageMarkdown +
      content.substring(cursorPosition)
    );
  };

  // Read file as data URL
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (
    file: File,
    content: string,
    cursorPosition: number,
  ): Promise<string | null> => {
    if (!file) {
      return null;
    }

    try {
      if (file.size > maxFileSize) {
        onError(
          `Image too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB`,
        );
        return null;
      }

      if (!file.type.startsWith("image/")) {
        onError("Only image files are allowed");
        return null;
      }

      const base64String = await readFileAsDataURL(file);

      const compressedImage = await compressImage(base64String);

      const timestamp = new Date().getTime();
      const imageName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;

      const imageId = await db.images.add({
        name: imageName,
        src: compressedImage,
        date: new Date(),
      });

      const imageMarkdown = `![${file.name}](/local-image/${imageId})`;

      const newContent = insertImageAtCursor(
        content,
        cursorPosition,
        imageMarkdown,
      );

      return newContent;
    } catch (error) {
      console.error("Image upload error:", error);
      onError(`Failed to process image: ${error}`);
      return null;
    }
  };

  // Trigger file input programmatically
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    handleImageUpload,
    triggerImageUpload,
  };
}
