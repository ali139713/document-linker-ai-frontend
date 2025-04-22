"use client";

import { useState, ChangeEvent } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
import { Button } from "@/components/Button";

type UploadedFile = {
  name: string;
  url: string;
};

type FileUploaderProps = {
  onUploadComplete: (files: UploadedFile[]) => void;
};

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);
    const urls: UploadedFile[] = [];

    for (const file of files) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      urls.push({ name: file.name, url: downloadURL });
    }

    setUploading(false);
    onUploadComplete(urls);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <input type="file" multiple onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
