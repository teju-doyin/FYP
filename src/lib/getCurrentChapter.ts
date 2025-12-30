import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export function useCurrentChapter(userUid: string | null) {
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userUid) {
      setLoading(false);
      return;
    }

    const fetchCurrentChapter = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userUid));
        const data = userDoc.data();
        setCurrentChapter(data?.currentChapter || 1);
      } catch (error) {
        console.error("Failed to fetch current chapter:", error);
        setCurrentChapter(1); // fallback to chapter 1
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentChapter();
  }, [userUid]);

  return { currentChapter, loading };
}
