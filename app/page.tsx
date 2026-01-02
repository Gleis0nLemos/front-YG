"use client";

import { useSearchParams } from "next/navigation";

import { Hero } from "@/components/Hero";
import { Message } from "@/components/Message";
import { EventDetails } from "@/components/EventDetails";
import { GiftList } from "@/components/GiftList";
import { ConfirmSection } from "@/components/ConfirmSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "amor2025";

  /* 🔐 VISÃO ADMIN */
  if (isAdmin) {
    return (
      <>
        <GiftList />
        <ConfirmSection />
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
