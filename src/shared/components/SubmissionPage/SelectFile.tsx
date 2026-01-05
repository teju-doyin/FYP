"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { useCurrentChapter } from "@/lib/getCurrentChapter";

import { getAuth } from "firebase/auth";
import SubmissionSuccess from "../modals/SubmissionSuccess";

type UploadState = "idle" | "selected" | "uploading";

const SelectFile = () => {
  const { user } = useAuth();
  const { currentChapterNumber, loading: chapterLoading } = useCurrentChapter(user ? user.uid : null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
  ];

  const handleBoxClick = () => {
    if (uploadState !== "uploading") fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only .docx and .pdf files are allowed.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
    setUploadState("selected");
    setProgress(0);
  };

  const handleCancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    setUploadState(file ? "selected" : "idle");
    setProgress(0);
  };

  const handleSubmit = async () => {
    if (!file) return;
    if (!user?.uid) {
      setError("You must be signed in to upload.");
      return;
    }
    if (chapterLoading) {
      setError("Chapter info is still loading. Try again.");
      return;
    }
    if (!currentChapterNumber) {
      setError("Current chapter is missing. Refresh and try again.");
      return;
    }

    try {
      setError(null);
      setUploadState("uploading");
      setProgress(0);

      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken(true);
      if (!token) {
        setError("Auth token missing. Please sign in again.");
        setUploadState("selected");
        return;
      }

      const form = new FormData();
      form.append("chapter", String(currentChapterNumber));
      form.append("file", file);

      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      xhr.open("POST", "/api/submit-chapter", true);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return;
        const p = (evt.loaded / evt.total) * 100;
        setProgress(Number(p.toFixed(1)));
      };

      xhr.onerror = () => {
        setError("Network error while uploading. Please try again.");
        setUploadState("selected");
        xhrRef.current = null;
      };

      xhr.onabort = () => {
        setError("Upload cancelled.");
        setUploadState(file ? "selected" : "idle");
        setProgress(0);
        xhrRef.current = null;
      };

      xhr.onload = () => {
        xhrRef.current = null;

        let payload: any = null;
        try {
          payload = JSON.parse(xhr.responseText || "{}");
        } catch {
          // ignore
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          setFile(null);
          setUploadState("idle");
          setProgress(0);
          if (fileInputRef.current) fileInputRef.current.value = "";
          setShowSuccessModal(true);
        } else {
          setError(payload?.error || `Upload failed (${xhr.status}).`);
          setUploadState("selected");
        }
      };

      xhr.send(form);
    } catch (e: any) {
      setError(e?.message || "Failed to upload.");
      setUploadState("selected");
      xhrRef.current = null;
    }
  };

  const renderUploadBox = () => {
    if (uploadState === "uploading") {
      return (
        <div className="h-full flex flex-col gap-3 justify-center items-center">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="35"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="stroke-grey-300"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${(1 - progress / 100) * 2 * Math.PI * 35}`}
                className="stroke-blue-800"
              />
              <text
                x="40"
                y="45"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                className="fill-grey-600"
              >
                {progress}%
              </text>
            </svg>
          </div>
          <p className="text-sm text-grey-600 text-center max-w-[200px]">
            Submitting {file?.name}
          </p>
        </div>
      );
    }

    if (uploadState === "selected" && file) {
      return (
        <div className="h-full flex flex-col gap-2 justify-center items-center text-center">
          <p className="font-light text-sm text-grey-300">File Selected:</p>
          <p className="text-[14px] text-grey-600 font-medium">{file.name}</p>
          <p className="text-xs text-grey-300">
            ({(file.size / 1024 / 1024).toFixed(1)} MB)
          </p>
          <p className="underline text-sm text-grey-300">Change file</p>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <Image src="/icons/folder.png" alt="Upload" width={40} height={40} />
        <p className="text-grey-300 text-[14px] text-center">
          Click here to open folder
        </p>
      </div>
    );
  };

  return (
    <div>
      <section className="card shadow w-[95%] mx-auto bg-white-50 py-8 rounded-[8px]">
        <div className="w-[85%] mx-auto">
          <div
            className={`bg-white border-2 rounded-[8px] h-[160px] mb-4 transition-all duration-200 ${
              uploadState === "uploading"
                ? "border-blue-300 cursor-default"
                : "border-dashed border-grey-300 hover:border-grey-200 cursor-pointer"
            }`}
            onClick={handleBoxClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploadState === "uploading"}
            />
            {renderUploadBox()}
          </div>

          <p className="text-center text-grey-300 text-sm font-light mb-8">
            Format accepted is{" "}
            <span className="text-grey-600 font-medium">.pdf</span>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            {uploadState === "uploading" ? (
              <Button
                variant="outline"
                className="w-full py-6 text-sm border-grey-300 text-grey-600"
                onClick={handleCancelUpload}
              >
                Cancel Upload
              </Button>
            ) : (
              <Button
                variant="secondary"
                disabled={!file || chapterLoading}
                onClick={handleSubmit}
                className={`py-6 text-lg flex-1 ${
                  file
                    ? "bg-blue-800 hover:bg-blue-900 text-white"
                    : "bg-grey-200 text-grey-300 cursor-not-allowed"
                }`}
              >
                {chapterLoading
                  ? "Loading chapter..."
                  : `Submit Chapter ${currentChapterNumber}`}
              </Button>
            )}
          </div>
        </div>
      </section>

      {showSuccessModal && <SubmissionSuccess />}
    </div>
  );
};

export default SelectFile;
