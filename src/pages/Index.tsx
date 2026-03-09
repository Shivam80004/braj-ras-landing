import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CascadingSlider from "@/components/sections/CascadingSlider";
import FeaturePills from "@/components/sections/FeaturePills";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import Countdown from "@/components/sections/Countdown";
import VideoSection from "@/components/sections/VideoSection";
import DeitiesSection from "@/components/sections/DeitiesSection";
import CornersSection from "@/components/sections/CornersSection";
import LilaSection from "@/components/sections/LilaSection";
import VCMSection from "@/components/sections/VCMSection";
import PerksSection from "@/components/sections/PerksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegisterSection from "@/components/sections/RegisterSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <CascadingSlider />
      <FeaturePills />
      <HorizontalScroll />
      <Countdown />
      <VideoSection />
      <DeitiesSection />
      <CornersSection />
      <LilaSection />
      <VCMSection />
      <PerksSection />
      <TestimonialsSection />
      <RegisterSection />
      <FooterSection />
    </div>
  );
};

export default Index;
