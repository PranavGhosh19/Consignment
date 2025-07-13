
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export function BottomBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading || user) {
    return null;
  }

  return (
    <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        <Button variant="ghost" asChild className="h-full rounded-none">
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild className="h-full rounded-none">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
