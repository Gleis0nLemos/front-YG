"use client";

import { useSearchParams } from "next/navigation";

import { Hero } from "@/app/components/Hero";
import { Message } from "@/app/components/Message";
import { EventDetails } from "@/app/components/EventDetails";
import { GiftList } from "@/app/components/GiftList";
import { ConfirmSection } from "@/app/components/ConfirmSection";
import { Footer } from "@/app/components/Footer";

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
