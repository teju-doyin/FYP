"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { auth } from "@/lib/firebase";

import { Document, Page, pdfjs } from "react-pdf";


import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const chapterTitles = [
  "Introduction",
  "Literature Review",
  "Methodology",
  "Implementation",
  "Summary",
];

export default function DocumentView() {
  const params = useParams<{ studentUid: string; chapter: string }>();
  const studentUid = params?.studentUid;
  const chapterNum = Number(params?.chapter);

  const chapterTitle = chapterTitles[chapterNum - 1] ?? `Chapter ${chapterNum}`;

  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setErrMsg(null);
      setPdfUrl("");

      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not signed in");

      const res = await fetch("/api/get-chapter-pdf", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentUid, chapter: chapterNum }),
      });

      const json = await res.json();
      console.log("API raw JSON:", JSON.stringify(json, null, 2));

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to load document");
      }

      setPdfUrl(json.signedUrl);
      setLoading(false);
    };

    if (studentUid && chapterNum) {
      run().catch((e) => {
        setErrMsg(e?.message || "Failed to load");
        setLoading(false);
      });
    }
  }, [studentUid, chapterNum]);

  
  const onDocLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="mb-22">
      <div className="space-y-1 text-center mb-4">
        <p className="text-grey-200 font-light">
          Chapter {chapterNum} - {chapterTitle}
        </p>
        <p className="text-blue-500 font-semibold text-[18px]">
          Student Project Title
        </p>
      </div>

      <div className="flex-between items-center mb-4">
        <p className="text-grey-300">
          Page <span className="text-blue-500 font-semibold">{pageNumber}</span> of{" "}
          <span className="text-blue-500 font-semibold">{numPages || "—"}</span>
        </p>

        <Button
          variant="default"
          className="py-4 px-2 rounded-[5px] bg-blue-500 text-white text-[14px]"
        >
          <Image
            src="/icons/add-feedback.png"
            alt="add feedback"
            width={20}
            height={20}
          />
        </Button>
      </div>

      <div className="bg-blue-50 p-1.5 rounded-[2px] mb-4">
        {loading && <p className="text-grey-700 text-[14px]">Loading PDF...</p>}
        {errMsg && !loading && (
          <p className="text-red-500 text-sm">{errMsg}</p>
        )}

        {!loading && !errMsg && pdfUrl && (
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setPageNumber(1);
            }}
            onLoadError={(err) => {
              console.error("react-pdf load error", err);
              setErrMsg(err.message || "Failed to load PDF");
            }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}

      </div>

      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          disabled={!numPages || pageNumber >= numPages}
          onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
