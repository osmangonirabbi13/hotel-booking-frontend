import HeroSection from "@/components/Home/herosection";
import RoomsSection from "@/components/Home/roomsSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import Navbar from "@/components/shared/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseSection/>
        <RoomsSection/>
      </main>
    </>
  );
}
