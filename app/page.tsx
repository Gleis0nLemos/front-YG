"use client";

import { Hero } from "@/app/components/Hero";
import { MessageAndEvent } from "@/app/components/MessageAndEvent";
import { GiftList } from "@/app/components/GiftList";
import { ConfirmSection } from "@/app/components/ConfirmSection";
import { Footer } from "@/app/components/Footer";
import { AdminConfirmList } from "./components/AdminConfirmList";

import { useAdminGate } from "./utils/useAdminGate";
import { useEffect, useState } from "react";

export default function Home() {
  const { isAdmin } = useAdminGate();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-secondary">
        Carregando...
      </div>
    );
  }

  return (
    <div key={isAdmin ? "admin-view" : "guest-view"} suppressHydrationWarning>
      {isAdmin ? (
        <>
          {/* Chave única força recriação do GiftList no modo admin */}
          <GiftList key="giftlist-admin" />
          <ConfirmSection />
          <AdminConfirmList />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <MessageAndEvent />
          {/* Chave única força recriação do GiftList no modo convidado */}
          <GiftList key="giftlist-guest" />
          <ConfirmSection />
          <Footer />
        </>
      )}
    </div>
  );
}