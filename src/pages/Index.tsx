import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PillarCardsSection from "@/components/PillarCardsSection";
import PillarDetailsSection from "@/components/PillarDetailsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PillarCardsSection />
      <PillarDetailsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
