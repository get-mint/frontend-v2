"use client";

import { AboutHero } from "./hero";
import { AboutStory } from "./story";
import { AboutMission } from "./mission";
import { AboutTeam } from "./team";
import { AboutPrinciples } from "./principles";
import { AboutVision } from "./vision";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutTeam />
      <AboutPrinciples />
      <AboutVision />
    </>
  );
}
