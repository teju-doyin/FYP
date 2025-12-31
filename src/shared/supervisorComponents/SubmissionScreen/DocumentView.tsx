"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import FeedbackBox, { FeedbackStatus } from "@/shared/components/modals/FeedbackBox";
import FeedbackSent from "@/shared/components/modals/FeedbackSent";

const chapterTitles = [
  "Introduction",
  "Literature Review",
  "Methodology",
  "Implementation",
  "Summary",
];

type FeedbackStatus = "action-required" | "needs-correction" | "approved";

export default function DocumentView() {
  const params = useParams<{ studentUid: string; chapter: string }>();
  const studentUid = params?.studentUid;
  const [studentName, setStudentName] = useState<string>("the student");
  const chapterNum = Number(params?.chapter);

  const chapterTitle = chapterTitles[chapterNum - 1] ?? `Chapter ${chapterNum}`;

  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // single state to control shadcn dialog
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("action-required");
  const [feedbackSentOpen, setFeedbackSentOpen] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);

  useEffect(() => {
    if (!studentUid) return;
    const fetchName = async () => {
      const snap = await getDoc(doc(db, "users", studentUid));
      const data = snap.data() as any;
      setStudentName(data?.fullName ?? data?.email ?? "the student");
    };
    fetchName();
  }, [studentUid]);


  const handleSubmitFeedback = async () => {
    if (!studentUid || !chapterNum) return;

    try {
      setSendingFeedback(true);

      const user = auth.currentUser;
      if (!user) {
        console.error("No signed-in user");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch("/api/save-feedback", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,   // << add this
        },
        body: JSON.stringify({
          studentUid,
          chapter: chapterNum,
          message: feedbackText,
          status: feedbackStatus,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("save-feedback failed", json);
        return;
      }

      setFeedbackText("");
      setFeedbackStatus("action-required");
      setFeedbackOpen(false);
      setFeedbackSentOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSendingFeedback(false);
    }
  };




  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setErrMsg(null);
      setPdfUrl("");

      const user = auth.currentUser;
      if (!user) {
        setErrMsg("Not signed in");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

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
      <div className="bg-blue-50 p-1.5 rounded-[2px] mb-4">
        {loading && <p className="text-grey-700 text-[14px]">Loading PDF...</p>}
        {errMsg && !loading && (
          <p className="text-red-500 text-sm">{errMsg}</p>
        )}

        {!loading && !errMsg && pdfUrl && (
          <div className="max-h-[80vh] overflow-auto">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocLoadSuccess}
              onLoadError={(err) => {
                setErrMsg(err.message || "Failed to load PDF");
              }}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        )}
      </div>

      {!feedbackOpen && (
        <div className="w-full fixed bottom-0 bg-white left-0 z-[99] rounded-t-xl shadow">
        <div className="w-[90%] mx-auto my-4">
          <div className="flex-between items-center mb-4">
            <p className="text-grey-300">
              Page{" "}
              <span className="text-blue-500 font-semibold">{pageNumber}</span>{" "}
              of{" "}
              <span className="text-blue-500 font-semibold">
                {numPages || "—"}
              </span>
            </p>
            <Button
              variant="default"
              className="py-4 px-2 rounded-[5px] bg-blue-500 text-white text-[14px]"
              onClick={() => setFeedbackOpen(true)}
            >
              <Image
                src="/icons/add-feedback.png"
                alt="add feedback"
                width={20}
                height={20}
              />
            </Button>
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
      </div>
    )}

      <FeedbackBox
      open={feedbackOpen}
      onOpenChange={setFeedbackOpen}
      text={feedbackText}
      status={feedbackStatus}
      onTextChange={setFeedbackText}
      onStatusChange={setFeedbackStatus}
      onSubmit={handleSubmitFeedback}
      sending={sendingFeedback}
    />

      <FeedbackSent
        open={feedbackSentOpen}
        onClose={() => setFeedbackSentOpen(false)}
        studentName={studentName}
      />

    </div>
  );
}
