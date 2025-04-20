"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const team = [
  {
    name: "Alexandros Lekkas",
    role: "University of Chicago",
  },
  {
    name: "Ashwin Balaraman",
    role: "University of Chicago",
  },
  {
    name: "Stelios Papapanagiotou",
    role: "Bentley University",
  },
];

export function Team() {
  return (
    <div className="py-24 bg-white">
      <div className="container px-6 mx-auto">
        <div className="text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Meet the team
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto mt-10 md:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group relative h-[400px] bg-primary/5 hover:bg-primary/10 rounded-[32px] p-6 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px]" />
                  <div className="absolute text-center bottom-6 left-6 right-6">
                    <h3 className="mb-1 text-xl font-medium text-primary">
                      {member.name}
                    </h3>
                    <p className="text-base text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
