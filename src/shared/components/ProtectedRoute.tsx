"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "student" | "supervisor";

export default function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: Role;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role && user.role !== allowedRole) {
      router.replace(
        user.role === "student" ? "/" : "/supervisor/home"
      );
    }
  }, [user, loading, router, allowedRole]);

  // IMPORTANT: don't render page content until you know
  if (loading) return null; // or a spinner

  if (!user) return null;

  if (user.role && user.role !== allowedRole) return null;

  return <>{children}</>;
}
