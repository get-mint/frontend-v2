import { Hero } from "./hero";
import { LogoBanner } from "./logo-banner";
import { HowMintWorks } from "./how-mint-works";
import { Faq } from "./faq";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <LogoBanner />
      <HowMintWorks />
      <Faq />
    </>
  );
}
