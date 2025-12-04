'use client'
import { Noto_Sans, Nunito } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
import { useErrorStore } from "@/shared/stores/error.store";
import BlockerPage from "@/shared/components/BlockerPage";
import Navbar from "@/shared/components/Navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const hasCriticalError = useErrorStore((state) => state.hasCriticalError);
  return (
    <html lang="en" className={`${notoSans.variable} ${nunito.variable}`}>
      <body
        className={` antialiased bg-[#F9F9FC]`}
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
              <div className="font-noto-sans">
                <main>{children} </main>
                <Navbar />                    
              </div>
            )}
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
