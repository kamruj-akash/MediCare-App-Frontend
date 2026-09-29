import CtaBanner from "@/components/modules/homePage/ctaBanner";
import Hero from "@/components/modules/homePage/hero";
import HowItWorks from "@/components/modules/homePage/howItWorks";
import Services from "@/components/modules/homePage/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <CtaBanner />
    </>
  );
}
