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

    
  const { isAdmin } = useAdminGate();

  // if (!mounted) {
  // return <div className="min-h-screen" />;
  // }


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
<section className="bg-background min-h-screen">
  <div
    className="
      grid
      lg:grid-cols-[68%_32%]     // um pouco mais equilibrado
      grid-cols-1
      gap-6 lg:gap-x-6 lg:gap-y-0 // gap-x médio em lg
      items-start
    "
  >
    <div className="bg-muted/40">
      <Message /> {/* com lg:pr-2 ou lg:pr-4 no section interno */}
    </div>

    <div className="bg-muted/20">
      <EventDetails /> {/* com lg:pl-2 lg:pr-40 no section interno */}
    </div>
  </div>
</section>
      <GiftList />
      <ConfirmSection />
      <Footer />
    </>
  );
}
