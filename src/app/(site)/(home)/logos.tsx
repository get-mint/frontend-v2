import Image from "next/image";

import { Marquee } from "@/components/magicui/marquee";

const brandImages = [
  "https://i.imgur.com/SR4Hvmh.png",
  "https://i.imgur.com/wdB3acc.png",
  "https://i.imgur.com/Thxa9ih.png",
  "https://i.imgur.com/TIfi9TR.png",
  "https://i.imgur.com/8heeJwE.png",
  "https://i.imgur.com/2r7fhd5.png",
  "https://i.imgur.com/BTkZtwp.png",
  "https://i.imgur.com/OfQlCHR.png",
  "https://i.imgur.com/rKGFeI6.png",
  "https://i.imgur.com/AtzuXvW.png",
];

export async function LogoBanner() {
  return (
    <div className="w-full bg-secondary animate-in fade-in">
      <Marquee className="h-20 w-full" pauseOnHover>
        {brandImages.map((imageUrl, index) => (
          <div key={index} className="flex items-center justify-center h-full">
            <Image
              src={imageUrl}
              alt="Brand logo"
              width={120}
              height={40}
              className="object-contain h-16"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
