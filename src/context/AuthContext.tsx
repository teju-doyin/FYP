"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Role = "student" | "supervisor";

type AppUser = {
  uid: string;
  email: string | null;
  role: Role | null;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  matricNumber?: string | null;
  projectTitle?: string | null;
  projectDescription?: string | null;
  title?: string | null; 
};

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser: User | null) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", fbUser.uid));
      const data = snap.data() as
        | {
            role?: Role;
            firstName?: string;
            lastName?: string;
            fullName?: string;
            matricNumber?: string | null;
            projectTitle?: string | null;
            projectDescription?: string | null;
            title?: string | null;
          }
        | undefined;

      setUser({
        uid: fbUser.uid,
        email: fbUser.email,
        role: data?.role ?? null,
        firstName: data?.firstName,
        lastName: data?.lastName,
        fullName: data?.fullName,
        matricNumber: data?.matricNumber ?? null,
        projectTitle: data?.projectTitle ?? null,
        projectDescription: data?.projectDescription ?? null,
        title: data?.title ?? null,
      });

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
