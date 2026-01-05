"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function useAdminGate() {
  const searchParams = useSearchParams();

  const [isAdmin] = useState(() => {
    if (typeof window === "undefined") return false;

    const param = searchParams.get("admin");
    const stored = localStorage.getItem("isAdmin");

    if (param === "amor2025") {
      localStorage.setItem("isAdmin", "true");
      return true;
    }

    return stored === "true";
  });

  return isAdmin;
}
