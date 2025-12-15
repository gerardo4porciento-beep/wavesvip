
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Loader2 } from "lucide-react";

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // TODO: Implement actual Supabase Storage or Cloudinary upload
    // For now: Mock wait and return dummy URL
    setTimeout(() => {
      const mockUrl = "https://via.placeholder.com/300?text=Receipt+Proof";
      setFileUrl(mockUrl);
      setUploading(false);
      onUpload(mockUrl);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 border-2 border-dashed border-input p-6 rounded-lg hover:bg-accent/5 transition-colors">
      {fileUrl ? (
        <div className="flex flex-col items-center text-green-600">
          <CheckCircle className="w-10 h-10 mb-2" />
          <p className="font-semibold">Comprobante subido</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{fileUrl}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setFileUrl(null)}>
            Cambiar archivo
          </Button>
        </div>
      ) : (
        <>
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <p>Subiendo...</p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mb-2" />
              <LabelInput onChange={handleFileChange} />
              <div className="text-center">
                <p className="font-semibold">Click para subir</p>
                <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function LabelInput({ onChange }: { onChange: (e: any) => void }) {
  return (
    <label className="absolute inset-0 cursor-pointer w-full h-full opacity-0">
      <input type="file" accept="image/*" onChange={onChange} className="hidden" />
      <span className="sr-only">Subir archivo</span>
      {/* This input is tricky to style with absolute, so simple approach below */}
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onChange}
      />
    </label>
  );
}
