import FacilitiesSection from "@/components/Home/facilitiesSection";
import HeroSection from "@/components/Home/herosection";
import RoomsSection from "@/components/Home/roomsSection";
import VideoSection from "@/components/Home/videoSection";
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
        <VideoSection/>
        <FacilitiesSection/>
      </main>
    </>
  );
}
