import { Faq } from "./faq";
import { Hero } from "./hero";
import { HowMintWorks } from "./how-mint-works";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <HowMintWorks />
      <Faq />
    </>
  );
}
