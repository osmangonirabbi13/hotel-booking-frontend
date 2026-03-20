import FacilitiesSection from "@/components/Home/facilitiesSection";
import GallerySection from "@/components/Home/gallerySection";
import HeroSection from "@/components/Home/herosection";
import NewsletterSection from "@/components/Home/newsletterSection";
import RoomsSection from "@/components/Home/roomsSection";
import TestimonialsSection from "@/components/Home/testimonialsSection";
import VideoSection from "@/components/Home/videoSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import Footer from "@/components/shared/footer";
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
        <TestimonialsSection/>
        <GallerySection/>
        <NewsletterSection/>
      </main>
      <Footer/>
    </>
  );
}
