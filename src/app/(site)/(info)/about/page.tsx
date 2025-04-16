import Image from "next/image";

export default function About() {
  return (
    <article className="min-h-screen bg-white">
      {/* Question Section */}
      <div className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-[90rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Question</span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-balance mt-4">
            <span className="text-[#39d992]">Why</span>
            <span className="text-black"> does saving money online feel so </span>
            <span className="text-[#39d992]">unreliable?</span>
          </h1>
          <p className="text-xl text-black/80 mt-8 max-w-3xl">
            If you're the one making the purchase… why aren't you earning? This question led us to look more closely at how most online "rewards" actually work.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-24 border-t">
        <div className="max-w-[90rem] mx-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="text-black">How did we get </span>
            <span className="text-[#39d992]">here?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
            <div>
              <p className="text-xl text-black/80">
                Founded in 2023, Mint started with a simple observation: while billions are earned through affiliate marketing, most consumers never see those rewards. We set out to change that, building a platform that puts transparency and user benefits first.
              </p>
            </div>
            <div>
              <p className="text-xl text-black/80">
                In our journey, we've assembled a team of passionate developers and designers united by a common goal: to make earning cashback as simple and transparent as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="container mx-auto px-4 py-24 border-t">
        <div className="max-w-[90rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Principles</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">We're building a </span>
            <span className="text-[#39d992]">cashback platform </span>
            <span className="text-black">that puts </span>
            <span className="text-[#39d992]">users first</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
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
              <div key={principle.title} className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] transition-shadow">
                <h3 className="text-[#39d992] text-2xl font-medium mb-4">{principle.title}</h3>
                <div className="h-[1px] w-8 bg-[#39d992]/20 mb-6"></div>
                <p className="text-lg text-black/60 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-24 border-t">
        <div className="max-w-[90rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Team</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">Meet the </span>
            <span className="text-[#39d992]">team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {[
              {
                name: "Alexandros Lekkas",
                role: "Co-Founder & CEO"
              },
              {
                name: "Stelios Papapanagiotou",
                role: "Co-Founder & CTO"
              },
              {
                name: "Ashwin Balaraman",
                role: "Co-Founder & COO"
              }
            ].map((member) => (
              <div 
                key={member.name} 
                className="group relative h-[400px] bg-[#39d992]/5 hover:bg-[#39d992]/10 rounded-3xl p-8 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#39d992]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium text-[#39d992] mb-2">{member.name}</h3>
                  <p className="text-black/60">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Presence */}
      <div className="container mx-auto px-4 py-24 border-t">
        <div className="max-w-[90rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Our Reach</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mt-4">
            <span className="text-black">Available </span>
            <span className="text-[#39d992]">worldwide</span>
          </h2>
          
          <div className="mt-16 relative">
            <div className="bg-[#f5f5f5] rounded-3xl p-12">
              <p className="text-xl text-black/80 max-w-2xl">
                Our extension works with major retailers and travel sites across the globe, ensuring you never miss out on cashback opportunities, no matter where you shop.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="container mx-auto px-4 py-24 border-t">
        <div className="max-w-[90rem] mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Vision</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mt-4">
            <span className="text-[#39d992]">Discover </span>
            <span className="text-black">the future of </span>
            <span className="text-[#39d992]">online savings</span>
          </h2>
          
          <div className="mt-16">
            <p className="text-xl text-black/80 max-w-2xl">
              We're building more than just a cashback platform - we're creating a new standard for how people should be rewarded for their online purchases. Join us in making this vision a reality.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
