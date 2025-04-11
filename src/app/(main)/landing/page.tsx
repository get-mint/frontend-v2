import { Hero } from "./hero";
import { LogoBanner } from "./logo-banner";
import { HowMintWorks } from "./how-mint-works";
import FAQ from "./faq";
import { FeaturesTable } from "./features-table";
import { About } from "./about";

import { Button } from "@mint-cashback/ui";

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <LogoBanner />
      <HowMintWorks />
      <FAQ />
      <About />
      <FeaturesTable />

      <Button>
        Hey there
      </Button>
    </>
  );
}
