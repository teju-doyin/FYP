'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
import { useErrorStore } from "@/shared/stores/error.store";
import BlockerPage from "@/shared/components/BlockerPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const hasCriticalError = useErrorStore((state) => state.hasCriticalError);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ToastProvider
            defaultOptions={{
              styleType: "filled-dark",
              closeButton:true
            }}
          >
                        {hasCriticalError ? (
              <BlockerPage /> // Render blocker page if a critical error exists
            ) : (
              children // Otherwise, render the regular application content
            )}
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
