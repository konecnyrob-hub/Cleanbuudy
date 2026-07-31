import Hero from "@/components/Hero";
import BenefitStrip from "@/components/BenefitStrip";
import Marquee from "@/components/Marquee";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import EverydayHelper from "@/components/EverydayHelper";
import Reassure from "@/components/Reassure";
import Testimonials from "@/components/Testimonials";
import WhyBuy from "@/components/WhyBuy";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <BenefitStrip />
      <Marquee />
      <Benefits />
      <HowItWorks />
      <EverydayHelper />
      <Reassure />
      <Testimonials />
      <WhyBuy />
      <Faq />
    </main>
  );
}
