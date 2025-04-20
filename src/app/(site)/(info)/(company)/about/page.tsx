"use client";

import { Hero } from "./hero";
import { Story } from "./story";
import { Team } from "./team";
import { Principles } from "./principles";
import { Vision } from "./vision";

export default function About() {
  return (
    <>
      <Hero />
      <Story />
      <Principles />
      <Team />
      <Vision />
    </>
  );
}
