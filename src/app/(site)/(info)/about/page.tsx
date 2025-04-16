import Image from "next/image";

const ArrowDown = () => (
  <div className="flex justify-center -mt-8">
    <div className="animate-bounce">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="#39d992" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

export default function About() {
  return (
    <article className="min-h-screen bg-white">
      {/* Question Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-[80rem] mx-auto text-center">
          <span className="text-base font-medium tracking-widest uppercase text-black/60">Question</span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-balance mt-6 mx-auto">
            <span className="text-[#39d992]">Why</span>
            <span className="text-black"> does saving money<br />online feel so </span>
            <span className="text-[#39d992]">unreliable?</span>
          </h1>
          <p className="text-xl sm:text-2xl text-black/80 mt-12 max-w-3xl mx-auto leading-relaxed">
            If you're the one making the purchase… why aren't you earning? This question led us to look more closely at how most online "rewards" actually work.
          </p>
        </div>
      </div>

      <ArrowDown />

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Realization</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4 mx-auto">
            <span className="text-black">Most cashback platforms </span>
            <span className="text-[#39d992]">weren't built for you.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <p className="text-lg text-black/80 mx-auto">
                Mint started with a simple observation: while billions are earned through affiliate marketing, most consumers never see those rewards. We set out to change that, building a platform that puts transparency and user benefits first.
              </p>
            </div>
            <div>
              <p className="text-lg text-black/80 mx-auto">
                In our journey, we've assembled a team of passionate developers and designers united by a common goal: to make earning cashback as simple and transparent as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ArrowDown />

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Our Approach</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4 mx-auto">
            <span className="text-black">So we </span>
            <span className="text-[#39d992]">flipped </span>
            <span className="text-black">the model.</span>
          </h2>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-xl text-black/80 mb-8">
              We built Mint with one goal: put the user first.
            </p>
            <p className="text-xl text-black/80 mb-8">
              No VC agendas. No corporate shortcuts. Just a fair, transparent system where you get half — always.
            </p>
            <p className="text-xl text-black/80">
              We're not chasing hyper-growth or selling your data. We're building something sustainable, honest, and made to serve real people — not shareholders.
            </p>
          </div>
        </div>
      </div>

      <ArrowDown />

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4 mx-auto">
            <span className="text-black">Meet the </span>
            <span className="text-[#39d992]">team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
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
                className="group relative h-[500px] bg-[#39d992]/5 hover:bg-[#39d992]/10 rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#39d992]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-xl font-medium text-[#39d992] mb-1">{member.name}</h3>
                  <p className="text-black/60 text-base">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ArrowDown />

      {/* Principles Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Principles</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4 mx-auto">
            <span className="text-[#39d992]">Our </span>
            <span className="text-black">non-negotiables</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              {
                title: "Transparency",
                description: "No more black boxes. See exactly how much you earn and why — every single time."
              },
              {
                title: "Simplicity",
                description: "Install once, earn forever. We handle the complex stuff while you shop normally."
              },
              {
                title: "Fairness",
                description: "A true 50/50 split on every deal. Your purchase, your rewards — shared fairly."
              },
              {
                title: "Privacy First",
                description: "Shop freely without being tracked. We only collect what's needed, nothing more."
              }
            ].map((principle) => (
              <div key={principle.title} className="bg-white rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] transition-shadow">
                <h3 className="text-[#39d992] text-xl font-medium mb-3">{principle.title}</h3>
                <div className="h-[1px] w-8 bg-[#39d992]/20 mb-4 mx-auto"></div>
                <p className="text-base text-black/60 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ArrowDown />

      {/* Vision Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-[80rem] mx-auto text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-black/60">Vision</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mt-4 mx-auto">
            <span className="text-[#39d992]">Redefining </span>
            <span className="text-black">how people </span>
            <span className="text-[#39d992]">earn online.</span>
          </h2>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-xl text-black/80 mb-8">
              We're not just building a cashback tool — we're building a shift in how value is shared.
            </p>
            <p className="text-xl text-black/80 mb-8">
              Our vision is simple: if brands profit from your purchase, you should too.
            </p>
            <p className="text-xl text-black/80 mb-8">
              We're here to make that the new normal.
            </p>
            <p className="text-xl text-black/80">
              Join us in creating a more transparent, rewarding future for online shopping.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
