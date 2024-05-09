'use client';

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";

export function DatingAssistant() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const generateReplies = async () => {
    if (!file) {
      alert("Please upload a screenshot first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const binaryData = e.target.result;

      try {
        console.log("INside........");
        
        const response = await fetch("/api/generate-replies", {
          method: "POST",
          body: binaryData,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        const result = await response.json();
        console.log("Replies:", result.replies);
      } catch (error) {
        console.error("Error generating replies:", error);
        alert("Failed to generate replies. Please try again.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 py-12 md:py-16">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-[#9333EA]">Dating Assistant</h1>
        <p className="text-[#4B5563] dark:text-[#D1D5DB]">
          Upload a screenshot of your conversation and get 3 suggested replies.
        </p>
      </div>
      <div className="space-y-4">
        <div className="group relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#9333EA] bg-[#F3E8FF] transition-colors hover:border-[#7C3AED] dark:border-[#6B7280] dark:bg-[#1F2937]">
          <ImageIcon className="h-12 w-12 text-[#9333EA] group-hover:text-[#7C3AED] dark:text-[#D1D5DB] dark:group-hover:text-[#E5E7EB]" />
          <input
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <Button
          className="w-full bg-[#9333EA] text-white hover:bg-[#7C3AED] dark:bg-[#F3E8FF] dark:text-[#1F2937] dark:hover:bg-[#E5E7EB]"
          onClick={generateReplies}
        >
          Generate Replies
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-[#F3E8FF] dark:bg-[#1F2937]">
          <CardContent className="space-y-2">
            <p className="text-sm font-medium text-[#4B5563] dark:text-[#E5E7EB]">
              "Hey, I really enjoyed our conversation earlier. Would you like to
              grab dinner sometime this week?"
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#F3E8FF] dark:bg-[#1F2937]">
          <CardContent className="space-y-2">
            <p className="text-sm font-medium text-[#4B5563] dark:text-[#E5E7EB]">
              "I had a great time talking with you. Are you free to meet up for
              coffee this weekend?"
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#F3E8FF] dark:bg-[#1F2937]">
          <CardContent className="space-y-2">
            <p className="text-sm font-medium text-[#4B5563] dark:text-[#E5E7EB]">
              "I'm really interested in getting to know you better. Would you be
              open to going on a date sometime soon?"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ImageIcon(props: any) {
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
