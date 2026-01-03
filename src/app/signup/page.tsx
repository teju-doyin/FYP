"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "student" | "supervisor";

const SignUp = () => {
  const router = useRouter();

  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    matricNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    projectTitle: "",
    projectDescription: "",
  });

  type SupervisorOption = {
    uid: string;
    fullName: string;
    email: string | null;
    title: string;
  };

  const [supervisors, setSupervisors] = useState<SupervisorOption[]>([]);
  const [selectedSupervisorId, setSelectedSupervisorId] =
    useState<string>("");

  const [supervisorTitle, setSupervisorTitle] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "users"),
        where("role", "==", "supervisor"),
      );
      const snap = await getDocs(q);
      setSupervisors(
        snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            uid: d.id,
            fullName: data.fullName ?? data.email ?? d.id,
            email: data.email ?? null,
            title: data.title ?? null,
          };
        }),
      );
    };
    load().catch(console.error);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    const {
      firstName,
      lastName,
      matricNumber,
      email,
      password,
      confirmPassword,
      projectTitle,
      projectDescription,
    } = form;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }

    if (role === "student") {
      if (!matricNumber.trim()) {
        setError("Matric number is required for students.");
        return;
      }
      if (!projectTitle.trim() || !projectDescription.trim()) {
        setError("Project title and description are required for students.");
        return;
      }
      if (!selectedSupervisorId) {
        setError("Please select your assigned supervisor.");
        return;
      }
    }

    if (role === "supervisor" && !supervisorTitle) {
      setError("Please select your title.");
      return;
    }

    try {
      setLoading(true);

      const cred: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const uid = cred.user.uid;
      const fullName = `${firstName} ${lastName}`.trim();

      // 1) Create user profile
      await setDoc(doc(db, "users", uid), {
        uid,
        firstName,
        lastName,
        fullName,
        email,
        role,
        // student-only
        matricNumber: role === "student" ? matricNumber : null,
        assignedSupervisorId: role === "student" ? selectedSupervisorId : null,
        projectTitle: role === "student" ? projectTitle : null,
        projectDescription: role === "student" ? projectDescription : null,
        // supervisor-only
        title: role === "supervisor" ? supervisorTitle : null,
        createdAt: serverTimestamp(),
      });

      // 2) Create student progress (ONLY for students)
      if (role === "student") {
        // IMPORTANT: path matches what Milestones + SelectChapterModal use
        const studentRef = doc(db, "users", uid, "students", uid);

        await setDoc(studentRef, {
          uid,
          projectTitle,
          projectDescription,
          currentChapter: 1,
          chapters: {
            1: { status: "not_started", progress: 0 },
            2: { status: "not_started", progress: 0 },
            3: { status: "not_started", progress: 0 },
            4: { status: "not_started", progress: 0 },
            5: { status: "not_started", progress: 0 },
          },
        });
      }

      // 3) Redirect
      if (role === "student") {
        router.push("/");
      } else {
        router.push("/supervisor/home");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err?.code === "auth/email-already-in-use"
          ? "Email is already in use."
          : "Failed to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const baseRoleCard =
    "pb-3 pt-5 mb-2 flex flex-col items-center cursor-pointer rounded-xl border";

  return (
    <div className="w-[95%] mx-auto">
      <div className="text-center mt-10 mb-4">
        <h1 className="text-[30px] text-blue-800 font-semibold">SIGN UP</h1>
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
        {/* first name */}
        <div>
          <p className="text-[#414651] font-medium text-sm mb-2">
            First Name*
          </p>
          <Input
            name="firstName"
            type="text"
            placeholder="Jane"
            className="py4 h-12 placeholder:text-grey-200"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        {/* last name */}
        <div>
          <p className="text-[#414651] font-medium text-sm mb-2">
            Last Name*
          </p>
          <Input
            name="lastName"
            type="text"
            placeholder="Doe"
            className="py4 h-12 placeholder:text-grey-200"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* supervisor title */}
        {role === "supervisor" && (
          <div>
            <p className="text-[#414651] font-medium text-sm mb-2">
              Title*
            </p>
            <Select
              value={supervisorTitle}
              onValueChange={setSupervisorTitle}
            >
              <SelectTrigger className="w-full py-6 text-[#414651] text-[16px]">
                <SelectValue placeholder="Select your title" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[14px]">Title</SelectLabel>
                  <SelectItem value="Dr" className="text-[16px]">
                    Dr
                  </SelectItem>
                  <SelectItem value="Prof" className="text-[16px]">
                    Prof
                  </SelectItem>
                  <SelectItem value="Mrs" className="text-[16px]">
                    Mrs
                  </SelectItem>
                  <SelectItem value="Mr" className="text-[16px]">
                    Mr
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* student-only fields */}
        {role === "student" && (
          <>
            <div>
              <p className="text-[#414651] font-medium text-sm mb-2">
                Matric Number*
              </p>
              <Input
                name="matricNumber"
                type="text"
                placeholder="232145"
                className="py4 h-12 placeholder:text-grey-200"
                value={form.matricNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="text-[#414651] font-medium text-sm mb-2">
                Project Title*
              </p>
              <Input
                name="projectTitle"
                type="text"
                placeholder="Design and Implementation of..."
                className="py4 h-12 placeholder:text-grey-200"
                value={form.projectTitle}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="text-[#414651] font-medium text-sm mb-2">
                Project Description*
              </p>
              <textarea
                name="projectDescription"
                placeholder="Briefly describe your project..."
                className="w-full h-28 border rounded-md p-3 text-sm placeholder:text-grey-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.projectDescription}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* email */}
        <div>
          <p className="text-[#414651] font-medium text-sm mb-2">
            Email Address*
          </p>
          <Input
            name="email"
            type="email"
            placeholder={
              role === "student"
                ? "jdoe145@stu.ui.edu.ng"
                : "jdoe@stu.ui.edu.ng"
            }
            className="py4 h-12 placeholder:text-grey-200"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* assigned supervisor */}
        {role === "student" && (
          <div>
            <p className="text-[#414651] font-medium text-sm mb-2">
              Assigned Supervisor*
            </p>
            <Select
              value={selectedSupervisorId}
              onValueChange={setSelectedSupervisorId}
            >
              <SelectTrigger className="w-full py-6 text-[#414651] text-[16px]">
                <SelectValue placeholder="Select a supervisor" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[14px]">
                    Supervisors
                  </SelectLabel>

                  {supervisors.map((s) => (
                    <SelectItem
                      key={s.uid}
                      value={s.uid}
                      className="text-[16px]"
                    >
                      {`${s.title ? s.title + " " : ""}${s.fullName}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* password */}
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

        {/* confirm password */}
        <div>
          <p className="text-[#414651] font-medium text-sm mb-2">
            Confirm Password*
          </p>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="......"
            className="py4 h-12 placeholder:text-grey-200"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          variant="default"
          disabled={loading}
          className="py-6 bg-blue-500 text-white text-lg hover:text-blue-500 w-full"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center mb-12">
        Already have an account? Login
        <Link
          href="/login"
          className="underline text-blue-800 font-semibold ml-1"
        >
          here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
