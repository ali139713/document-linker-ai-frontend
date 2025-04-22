"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleUploadComplete = async (urls: string[]) => {
    setUploadedFiles(urls);

    // Now send to FastAPI backend
    const res = await fetch("http://localhost:8000/ingest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: urls }),
    });

    const result = await res.json();
    console.log("Ingested:", result);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <FileUploader onUploadComplete={handleUploadComplete} />
      <ChatUI />
    </div>
  );
}
