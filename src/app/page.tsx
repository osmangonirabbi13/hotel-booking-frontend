import FacilitiesSection from "@/components/Home/facilitiesSection";
import GallerySection from "@/components/Home/gallerySection";
import HeroSection from "@/components/Home/herosection";
import NewsletterSection from "@/components/Home/newsletterSection";
import RoomsSection from "@/components/Home/roomsSection";
import TestimonialsSection from "@/components/Home/testimonialsSection";
import VideoSection from "@/components/Home/videoSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import Footer from "@/components/shared/footer";
import NavbarWrapper from "@/components/shared/NavbarWrapper";  

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <NavbarWrapper/>
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
