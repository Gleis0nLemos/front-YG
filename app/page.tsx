'use client';

import { Hero } from "@/app/components/Hero";
import { MessageAndEvent } from "@/app/components/MessageAndEvent";
import { GiftList } from "@/app/components/GiftList";
import { ConfirmSection } from "@/app/components/ConfirmSection";
import { Footer } from "@/app/components/Footer";
import { AdminConfirmList } from "./components/AdminConfirmList";

import { useAdminGate } from "./utils/useAdminGate";
import { useEffect, useState, Suspense } from "react";

function PageContent() {
  const { isAdmin } = useAdminGate();

  return (
    <div key={isAdmin ? "admin-view" : "guest-view"} suppressHydrationWarning>
      {isAdmin ? (
        <>
          <GiftList key="giftlist-admin" />
          <ConfirmSection />
          <AdminConfirmList />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <MessageAndEvent />
          <GiftList key="giftlist-guest" />
          <ConfirmSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-secondary">
        Carregando...
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center text-secondary">
        Carregando página...
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}