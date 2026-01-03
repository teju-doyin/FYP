"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // [web:289][web:316]

type Role = "student" | "supervisor";

const Login = () => {
  const router = useRouter();

  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // 1) sign in with email/password
      const cred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      ); // [web:289]

      const uid = cred.user.uid;

      // 2) fetch Firestore profile to get stored role
      const snap = await getDoc(doc(db, "users", uid));
      if (!snap.exists()) {
        setError("Profile not found. Contact admin.");
        return;
      }

      const data = snap.data() as { role?: Role };
      const storedRole = data.role;

      if (!storedRole) {
        setError("Account role is missing. Contact admin.");
        return;
      }

      // 3) Optional safety: ensure user picked correct role
      if (storedRole !== role) {
        setError(
          `This account is registered as ${storedRole}. Switch role selection.`
        );
        return;
      }

      // 4) redirect by role
      if (storedRole === "student") {
        router.push("/");
      } else {
        router.push("/supervisor/home");
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const baseRoleCard =
    "pb-3 pt-5 mb-2 flex flex-col items-center cursor-pointer rounded-xl border";

  return (
    <div className="w-[95%] mx-auto">
      <div className="text-center mt-10 mb-4">
        <h1 className="text-[30px] text-blue-800 font-semibold">
          Welcome Back
        </h1>
        <p className="text-grey-300">Who are you?</p>
      </div>

      {/* Role selection */}
      <div className="flex gap-5 justify-center mb-6">
        <div
          className={`${baseRoleCard} ${
            role === "student"
              ? "border-blue-500 bg-blue-50"
              : "border-transparent"
          }`}
          onClick={() => setRole("student")}
        >
          <Image
            src="/student-illustration.png"
            alt="Student"
            width={90}
            height={90}
          />
          <h2 className="text-blue-800 font-medium text-[16px] mt-2">
            Student
          </h2>
        </div>
        <div
          className={`${baseRoleCard} ${
            role === "supervisor"
              ? "border-blue-500 bg-blue-50"
              : "border-transparent"
          }`}
          onClick={() => setRole("supervisor")}
        >
          <Image
            src="/supervisor-illustration.png"
            alt="Supervisor"
            width={105}
            height={105}
          />
          <h2 className="text-blue-800 font-medium text-[16px] mt-2">
            Supervisor
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 mb-3">
        <div>
          <p className="text-[#414651] font-medium text-sm mb-2">Email*</p>
          <Input
            name="email"
            type="email"
            placeholder="jdoe145@stu.ui.edu.ng"
            className="py4 h-12 placeholder:text-grey-200"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <p className="text-[#414651] font-medium text-sm mb-2">
            Password*
          </p>
          <Input
            name="password"
            type="password"
            placeholder="......"
            className="py4 h-12 placeholder:text-grey-200"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          variant="default"
          disabled={loading}
          className="py-6 bg-blue-500 text-white text-lg hover:text-blue-500 w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-center mb-12">
        Don&apos;t have an account yet? Sign up
        <Link
          href="/signup"
          className="underline text-blue-800 font-semibold ml-1"
        >
          here
        </Link>
      </p>
    </div>
  );
};

export default Login;
