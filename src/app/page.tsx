import Hero from "@/components/home/Hero";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import FreeSampleSection from "@/components/home/FreeSampleSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServicesShowcase />
      <FreeSampleSection />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
