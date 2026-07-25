"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null; // or a loading spinner
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
