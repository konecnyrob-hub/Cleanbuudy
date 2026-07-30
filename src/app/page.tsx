import Hero from "@/components/Hero";
import BenefitStrip from "@/components/BenefitStrip";
import Marquee from "@/components/Marquee";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import SpeedModes from "@/components/SpeedModes";
import Surfaces from "@/components/Surfaces";
import Reassure from "@/components/Reassure";
import InBox from "@/components/InBox";
import Specs from "@/components/Specs";
import Testimonials from "@/components/Testimonials";
import WhyBuy from "@/components/WhyBuy";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <BenefitStrip />
      <Marquee />
      <Benefits />
      <HowItWorks />
      <SpeedModes />
      <Surfaces />
      <Reassure />
      <InBox />
      <Specs />
      <Testimonials />
      <WhyBuy />
      <Pricing />
      <Faq />
    </main>
  );
}
