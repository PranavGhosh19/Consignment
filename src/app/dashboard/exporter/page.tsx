
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Skeleton } from "@/components/ui/skeleton";

export default function ExporterDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const uData = userDoc.data();
          if (uData.userType === 'exporter') {
            setUser(currentUser);
            setUserData(uData);
          } else {
             router.push('/dashboard');
          }
        } else {
           router.push('/login');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);
  
  if (loading || !user) {
    return (
        <div className="container py-6 md:py-10">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-64" />
            </div>
        </div>
    )
  }

  return (
    <div className="container py-6 md:py-10">
        
    </div>
  );
}
