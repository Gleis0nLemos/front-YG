"use client";

// import { useSearchParams } from "next/navigation";

import { Hero } from "@/app/components/Hero";
import { Message } from "@/app/components/Message";
import { EventDetails } from "@/app/components/EventDetails";
import { GiftList } from "@/app/components/GiftList";
import { ConfirmSection } from "@/app/components/ConfirmSection";
import { Footer } from "@/app/components/Footer";

import { useAdminGate } from "./utils/useAdminGate";
import { AdminConfirmList } from "./components/AdminConfirmList";
// import { mockConfirmations } from "./mock/mockConfirmations";

export default function Home() {
  // const searchParams = useSearchParams();
  // const isAdmin = searchParams.get("admin") === "amor2025";

    
  const { isAdmin, mounted } = useAdminGate();

  if (!mounted) {
  return <div className="min-h-screen" />;
  }


  /* 🔐 VISÃO ADMIN */
  if (isAdmin) {
    return (
      <>
        <GiftList />
        <ConfirmSection />
        {/* <AdminConfirmList data={mockConfirmations} /> */}
        <AdminConfirmList  />
        
        <Footer />
      </>
    );
  }

  /* 👤 VISÃO CONVIDADO */
  return (
    <>
      <Hero />
      <Message />
      <EventDetails />
      <GiftList />
      <ConfirmSection />
      <Footer />
    </>
  );
}
