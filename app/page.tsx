import { Hero } from "@/components/Hero";
import { Message } from "@/components/Message";
import { EventDetails } from "@/components/EventDetails";
import { GiftList } from "@/components/GiftList";
import { ConfirmSection } from "@/components/ConfirmSection";
import { Footer } from "@/components/Footer";

export default function Home() {
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
