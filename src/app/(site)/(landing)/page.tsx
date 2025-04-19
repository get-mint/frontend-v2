import { Faq } from "./faq";
import { Join } from "./join";
import { Comparison } from "./comparison";
import { Hero } from "./hero";
import { HowMintWorks } from "./how-mint-works";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <HowMintWorks />
      <Comparison />
      <Faq />
      <Join />
    </>
  );
}
