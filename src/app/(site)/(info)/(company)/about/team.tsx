"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const team = [
  {
    name: "Alexandros Lekkas",
    role: "University of Chicago"
  },
  {
    name: "Ashwin Balaraman",
    role: "University of Chicago"
  },
  {
    name: "Stelios Papapanagiotou",
    role: "Bentley University"
  }
];

export function AboutTeam() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Meet the team
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              {team.map((member) => (
                <div 
                  key={member.name} 
                  className="group relative h-[400px] bg-primary/5 hover:bg-primary/10 rounded-[32px] p-6 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px]" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h3 className="text-xl font-medium text-primary mb-1">{member.name}</h3>
                    <p className="text-gray-600 text-base">{member.role}</p>
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