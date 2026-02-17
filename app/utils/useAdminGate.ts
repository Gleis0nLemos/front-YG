"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useAdminGate() {
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const param = searchParams.get("admin");

    if (param === "amor2025") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      return;
    }

    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [searchParams]);

  return { isAdmin, mounted };
}
