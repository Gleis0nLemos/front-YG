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
import { MessageAndEvent } from "./components/MessageAndEvent";
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
      <MessageAndEvent />
      <GiftList />
      <ConfirmSection />
      <Footer />
    </>
  );
}


{/* <section className="bg-background min-h-screen px-4 md:px-6 lg:px-8">
  <div
    className="
      grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6
      items-start
    "
  >
//     {/* Message ocupa mais espaço */}
//     <div className="lg:col-span-3 xl:col-span-4">
//       <Message /> {/* pode colocar lg:pr-4 ou lg:pr-6 aqui se precisar */}
//     </div>

//     {/* EventDetails ocupa menos */}
//     <div className="lg:col-span-1 xl:col-span-2">
//       <EventDetails /> {/* pode colocar lg:pl-4 ou lg:pl-6 aqui */}
//     </div>
//   </div>
// // </section> */}
