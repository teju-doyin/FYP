"use client";

import { Noto_Sans, Nunito } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
import { useErrorStore } from "@/shared/stores/error.store";
import BlockerPage from "@/shared/components/BlockerPage";
import Navbar from "@/shared/components/Navbar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

function AppShell({ children }: { children: React.ReactNode }) {
  const hasCriticalError = useErrorStore((state) => state.hasCriticalError);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const hideNavbarOn = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);
  return (
    <QueryProvider>
      <ToastProvider
        defaultOptions={{
          styleType: "filled-dark",
          closeButton: true,
        }}
      >
        {hasCriticalError ? (
          <BlockerPage />
        ) : (
          <div className="font-noto-sans">
            <main>{children}</main>

            {/* show navbar only when logged in */}
            {!loading && user && !shouldHideNavbar && <Navbar />}
          </div>
        )}
      </ToastProvider>
    </QueryProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${nunito.variable}`}>
      <body className="antialiased bg-[#F9F9FC]">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
