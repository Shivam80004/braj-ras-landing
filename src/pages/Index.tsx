import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegisterSection from "@/components/sections/RegisterSection";
import FooterSection from "@/components/sections/FooterSection";
import MotionPathGallery from "@/components/sections/MotionPathGallery";
import GoldenTrailItinerary from "@/components/sections/GoldenTrailItinerary";
import CascadingPerks from "@/components/sections/CascadingPerks";
import TypoScroll from "@/components/sections/TypoScroll";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <VideoSection />
        <MotionPathGallery />
        <GoldenTrailItinerary />
        <CascadingPerks />
        <TestimonialsSection />
        <TypoScroll />
        <RegisterSection />
        <FooterSection />
      </div>
    </SmoothScroll>
  );
};

export default Index;
