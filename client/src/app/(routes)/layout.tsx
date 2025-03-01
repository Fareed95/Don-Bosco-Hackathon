"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-indigo/10 to-soft-purple/10">
      {children}
    </div>
  );
} 