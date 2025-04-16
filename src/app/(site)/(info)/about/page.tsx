import Image from "next/image";

export default function About() {
  return (
    <article className="min-h-screen bg-white">
      {/* Question Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-[80rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Question</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mt-4">
            <span className="text-[#39d992]">Why</span>
            <span className="text-black"> does saving money online feel so </span>
            <span className="text-[#39d992]">unreliable?</span>
          </h1>
          <p className="text-lg text-black/80 mt-6 max-w-2xl">
            If you're the one making the purchase… why aren't you earning? This question led us to look more closely at how most online "rewards" actually work.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Realization</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">Most cashback platforms </span>
            <span className="text-[#39d992]">weren't built for you.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <p className="text-lg text-black/80">
              We realized the game was rigged. While companies were raking in billions from your purchases through affiliate deals, you were left with confusing points, unreliable payouts, and cashback that often never showed up. The system was built to reward the platforms — not the people actually spending.              </p>
            </div>
            <div>
              <p className="text-lg text-black/80">
              So we built Mint to flip that. Real money. Clear terms. A transparent 50/50 split that puts your share back where it belongs — in your wallet, not someone else’s balance sheet.

</p>
            </div>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Principles</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">We're building a </span>
            <span className="text-[#39d992]">cashback platform </span>
            <span className="text-black">that puts </span>
            <span className="text-[#39d992]">users first</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {[
              {
                title: "Transparency",
                description: "Clear, honest communication about how we operate and how you earn."
              },
              {
                title: "Simplicity",
                description: "A streamlined experience that works automatically in the background."
              },
              {
                title: "Fairness",
                description: "Equal distribution of earnings between platform and users."
              },
              {
                title: "Privacy First",
                description: "Your data remains yours, with no unnecessary tracking or sharing."
              }
            ].map((principle) => (
              <div key={principle.title} className="bg-white rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] transition-shadow">
                <h3 className="text-[#39d992] text-xl font-medium mb-3">{principle.title}</h3>
                <div className="h-[1px] w-8 bg-[#39d992]/20 mb-4"></div>
                <p className="text-base text-black/60 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">Meet the </span>
            <span className="text-[#39d992]">team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
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
            ].map((member) => (
              <div 
                key={member.name} 
                className="group relative h-[300px] bg-[#39d992]/5 hover:bg-[#39d992]/10 rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#39d992]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-medium text-[#39d992] mb-1">{member.name}</h3>
                  <p className="text-black/60 text-base">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Presence */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Our Reach</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">Available </span>
            <span className="text-[#39d992]">worldwide</span>
          </h2>
          
          <div className="mt-12">
            <div className="bg-[#f5f5f5] rounded-2xl p-8">
              <p className="text-lg text-black/80 max-w-2xl">
                Our extension works with major retailers and travel sites across the globe, ensuring you never miss out on cashback opportunities, no matter where you shop.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Vision</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4">
            <span className="text-[#39d992]">Discover </span>
            <span className="text-black">the future of </span>
            <span className="text-[#39d992]">online savings</span>
          </h2>
          
          <div className="mt-12">
            <p className="text-lg text-black/80 max-w-2xl">
              We're building more than just a cashback platform - we're creating a new standard for how people should be rewarded for their online purchases. Join us in making this vision a reality.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
