"use client";

import { useState, useEffect } from "react";
import { useFileUpload } from "../Contexts/UploadContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../Contexts/ThemeContext";
import { cn } from "../../lib/utlis";

const UploadPage = () => {
  const { uploadFile, uploadLoading, error, clearError } = useFileUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string>("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValidationError("");
    clearError();

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setValidationError(
          "Invalid file type. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX"
        );
        setSelectedFile(null);
        return;
      }

      if (file.size > maxSize) {
        setValidationError("File size too large. Maximum size is 5MB");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await uploadFile(selectedFile);

      if (result.success) {
        toast.success(`File uploaded: ${result.file?.title}`);
        router.push("/Docs");
      } else {
        router.push("/sign-up");
        toast.error(result.error || "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }

    setSelectedFile(null);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "w-full max-w-2xl rounded-xl border shadow-sm transition-colors",
          theme === "dark"
            ? "bg-zinc-900 border-zinc-800"
            : "bg-white border-zinc-200"
        )}
      >
        <div className="px-6 pt-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">Upload your file</h1>
              <p className={cn("mt-1 text-sm", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>Supported: JPEG, PNG, GIF, PDF, DOC, DOCX (max 5MB)</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <motion.label
            htmlFor="fileUpload"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "group flex flex-col items-center justify-center gap-3 w-full rounded-lg border-2 border-dashed cursor-pointer px-8 py-14 text-center",
              theme === "dark"
                ? "border-zinc-700 bg-zinc-900/40 hover:border-blue-500/70"
                : "border-zinc-300 bg-zinc-50 hover:border-blue-500/70"
            )}
          >
            <div className={cn(
              "rounded-full p-3",
              theme === "dark" ? "bg-zinc-800 text-zinc-200" : "bg-white text-zinc-700 border border-zinc-200"
            )}>
              <UploadCloud className="h-6 w-6" />
            </div>
            <div className="text-sm">
              <span className="font-medium">Click to upload</span>
              <span className={cn("mx-1", theme === "dark" ? "text-zinc-400" : "text-zinc-500")}>or</span>
              <span className={cn("", theme === "dark" ? "text-zinc-300" : "text-zinc-600")}>drag and drop</span>
            </div>
            {selectedFile && (
              <div className={cn("mt-2 text-xs", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>Selected: {selectedFile.name}</div>
            )}
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.label>

          {selectedFile && (
            <div className={cn("mt-4 rounded-md border p-4", theme === "dark" ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white")}
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="truncate">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className={cn("text-xs mt-1", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · {selectedFile.type || "Unknown type"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className={cn(
                    "inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium transition",
                    theme === "dark"
                      ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                  )}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {validationError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "mt-4 text-sm rounded-md px-3 py-2",
                theme === "dark" ? "text-red-400 bg-red-950/40" : "text-red-600 bg-red-100"
              )}
            >
              {validationError}
            </motion.p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "mt-4 text-sm rounded-md px-3 py-2",
                theme === "dark" ? "text-red-400 bg-red-950/40" : "bg-red-100 text-red-700"
              )}
            >
              {error}
            </motion.p>
          )}

          <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/Docs")}
              className={cn(
                "inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium transition",
                theme === "dark"
                  ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              )}
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: !uploadLoading && selectedFile ? 1.02 : 1 }}
              whileTap={{ scale: !uploadLoading && selectedFile ? 0.98 : 1 }}
              onClick={handleUpload}
              disabled={uploadLoading || !selectedFile}
              className={cn(
                "inline-flex justify-center rounded-md px-4 py-2 text-sm font-semibold transition text-white",
                uploadLoading || !selectedFile
                  ? "bg-zinc-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {uploadLoading ? "Uploading..." : "Upload"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;