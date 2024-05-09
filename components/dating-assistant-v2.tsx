"use client";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import React, { useState } from "react";

export function DatingAssistantV() {
  const [file, setFile] = useState(null);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE_MB = 3;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];

    // Check if the uploaded file is an image and not larger than 3 MB
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      if (selectedFile.size <= MAX_FILE_SIZE_BYTES) {
        setFile(selectedFile);
        setError(""); // Clear any previous errors
      } else {
        setFile(null);
        setError(
          `The image file should not exceed ${MAX_FILE_SIZE_MB} MB. Please upload a smaller image.`
        );
      }
    } else {
      setFile(null);
      setError("Please upload a valid image file (JPEG, PNG).");
    }
  };

  const generateReplies = async () => {
    if (!file) {
      alert("Please upload a valid image file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e:any) => {
      const binaryData = e.target.result;

      try {
        const response = await fetch("/api/generate-replies", {
          method: "POST",
          body: binaryData,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        const result = await response.json();
        setReplies(result.replies);
      } catch (error) {
        console.error("Error generating replies:", error);
        alert("Failed to generate replies. Please try again.");
      }
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-2xl space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9333EA] to-[#7C3AED] bg-clip-text text-transparent md:text-5xl">
            Dating Assistant
          </h1>
          <p className="text-[#4B5563] text-lg dark:text-[#D1D5DB]">
            Upload a screenshot of your conversation and get 3 suggested
            replies.
          </p>
        </div>
        <div className="space-y-6">
          <div className="group relative flex h-56 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#9333EA] bg-gradient-to-r from-[#F3E8FF] to-[#E5E7EB] transition-colors hover:border-[#7C3AED] dark:border-[#6B7280] dark:bg-gradient-to-r dark:from-[#1F2937] dark:to-[#374151]">
            <ImageIcon className="h-14 w-14 text-[#9333EA] group-hover:text-[#7C3AED] dark:text-[#D1D5DB] dark:group-hover:text-[#E5E7EB]" />
            <input
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              type="file"
              accept="image/*" // Only accept image file types
              onChange={handleFileChange}
            />
          </div>
          <Button
            className="w-full rounded-lg bg-gradient-to-r from-[#9333EA] to-[#7C3AED] py-3 text-lg font-medium text-white hover:from-[#7C3AED] hover:to-[#9333EA] dark:bg-gradient-to-r dark:from-[#F3E8FF] dark:to-[#E5E7EB] dark:text-[#1F2937] dark:hover:from-[#E5E7EB] dark:hover:to-[#F3E8FF]"
            onClick={generateReplies}
          >
            Generate Replies
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {replies.map((reply, index) => (
          <Card key={index} className="rounded-lg bg-gradient-to-r from-[#F3E8FF] to-[#E5E7EB] p-6 shadow-lg dark:bg-gradient-to-r dark:from-[#1F2937] dark:to-[#374151] dark:shadow-none">
            <CardContent className="space-y-3 flex items-center justify-between">
              <p className="text-base font-medium text-[#4B5563] dark:text-[#E5E7EB]">
                {reply}
              </p>
              <Button size="icon" variant="ghost">
                <CopyIcon className="h-5 w-5 text-[#9333EA] dark:text-[#E5E7EB]" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
}

function CopyIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ImageIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
