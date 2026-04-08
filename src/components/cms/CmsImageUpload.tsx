import { useRef, useEffect, useState } from "react";
import { uploadImage } from "./cms-api";
import { Upload, Loader2, X, Image as ImageIcon } from "lucide-react";

interface CmsImageUploadProps {
  onUpload: (url: string, previewDataUrl?: string) => void;
  onClose: () => void;
}

export default function CmsImageUpload({ onUpload, onClose }: CmsImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const browseBtnRef = useRef<HTMLButtonElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB");
      return;
    }

    setUploading(true);
    setError("");
    try {
      // Create local preview data URL before uploading
      const previewDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      const { url } = await uploadImage(file);
      onUpload(url, previewDataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const drop = dropRef.current;
    const input = inputRef.current;
    const closeBtn = closeBtnRef.current;
    const browseBtn = browseBtnRef.current;
    if (!drop || !input) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setDragOver(true);
    };
    const handleDragLeave = () => setDragOver(false);
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer?.files[0];
      if (file) handleFile(file);
    };
    const handleInput = () => {
      const file = input.files?.[0];
      if (file) handleFile(file);
    };
    const handleClose = () => onClose();
    const handleBrowse = () => input.click();

    drop.addEventListener("dragover", handleDragOver);
    drop.addEventListener("dragleave", handleDragLeave);
    drop.addEventListener("drop", handleDrop);
    input.addEventListener("change", handleInput);
    closeBtn?.addEventListener("click", handleClose);
    browseBtn?.addEventListener("click", handleBrowse);

    return () => {
      drop.removeEventListener("dragover", handleDragOver);
      drop.removeEventListener("dragleave", handleDragLeave);
      drop.removeEventListener("drop", handleDrop);
      input.removeEventListener("change", handleInput);
      closeBtn?.removeEventListener("click", handleClose);
      browseBtn?.removeEventListener("click", handleBrowse);
    };
  }, [onUpload, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-sora text-lg font-semibold text-gray-900">
            Upload Image
          </h3>
          <button
            ref={closeBtnRef}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={dropRef}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            dragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-gray-400" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </>
          ) : (
            <>
              <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
              <p className="mb-1 text-sm text-gray-600">
                Drag & drop an image here
              </p>
              <p className="mb-3 text-xs text-gray-400">or</p>
              <button
                ref={browseBtnRef}
                className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Upload className="h-4 w-4" />
                Browse Files
              </button>
            </>
          )}
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" />

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        <p className="mt-3 text-xs text-gray-400">
          Max file size: 10MB. Supported: JPG, PNG, GIF, WebP, AVIF, SVG
        </p>
      </div>
    </div>
  );
}
