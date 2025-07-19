
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export function BottomBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const hideOnPaths = ["/login", "/signup"];

  if (loading || user || hideOnPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-20 bg-background border-t shadow-[0_-2px_4px_0_rgba(0,0,0,0.05)] p-2">
      <div className="flex h-full items-center justify-evenly gap-2">
        <Button variant="ghost" asChild className="h-12 w-full rounded-full text-base transition-transform hover:scale-105">
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild className="h-12 w-full rounded-full text-base shadow-lg transition-transform hover:scale-105">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
