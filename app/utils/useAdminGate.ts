"use client";

import { useSearchParams } from "next/navigation";

export function useAdminGate() {
  const searchParams = useSearchParams();

  const param = searchParams.get("admin");

  if (typeof window !== "undefined") {
    if (param === "amor2025") {
      localStorage.setItem("isAdmin", "true");
      return { isAdmin: true };
    }

    return {
      isAdmin: localStorage.getItem("isAdmin") === "true",
    };
  }

  return { isAdmin: false };
}
