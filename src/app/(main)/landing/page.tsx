import { Hero } from "./hero";
import { LogoBanner } from "./logo-banner";
import { HowMintWorks } from "./how-mint-works";
import { Faq } from "./faq";
import { FeaturesTable } from "./features-table";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <LogoBanner />
      <HowMintWorks />
      <Faq />
      <FeaturesTable />
    </>
  );
}
