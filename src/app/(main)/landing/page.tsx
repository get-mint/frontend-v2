import { Hero } from "./hero";
import { LogoBanner } from "./logo-banner";
import { HowMintWorks } from "./how-mint-works";
import FAQ from "./faq";
import { FeaturesTable } from "./features-table";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <LogoBanner />
      <HowMintWorks />
      <FeaturesTable />
      <FAQ />
    </>
  );
}
