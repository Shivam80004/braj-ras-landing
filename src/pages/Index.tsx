import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import FeaturePills from "@/components/sections/FeaturePills";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import CornersSection from "@/components/sections/CornersSection";
import LilaSection from "@/components/sections/LilaSection";
import VCMSection from "@/components/sections/VCMSection";
import PerksSection from "@/components/sections/PerksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegisterSection from "@/components/sections/RegisterSection";
import FooterSection from "@/components/sections/FooterSection";
import MotionPathGallery from "@/components/sections/MotionPathGallery";
import CascadingPerks from "@/components/sections/CascadingPerks";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <VideoSection />
        <MotionPathGallery />
        <CascadingPerks />
        <FeaturePills />
        <HorizontalScroll />
        <CornersSection />
        <LilaSection />
        <VCMSection />
        <PerksSection />
        <TestimonialsSection />
        <RegisterSection />
        <FooterSection />
      </div>
    </SmoothScroll>
  );
};

export default Index;
