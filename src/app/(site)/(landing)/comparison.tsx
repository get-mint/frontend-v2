import { Check, X } from "lucide-react";

const features = [
  {
    feature: "Real cash, no points",
    description: "Get paid in real money directly, without any point system conversions",
    mint: true,
    topcashback: true,
    rebatesme: true
  },
  {
    feature: "Low minimum payout",
    description: "Cash out your earnings with a low minimum threshold",
    mint: true,
    topcashback: true,
    rebatesme: false
  },
  {
    feature: "Transparent 50/50 split",
    description: "We share half of what we earn with you, always",
    mint: true,
    topcashback: false,
    rebatesme: false
  },
  {
    feature: "Simple, modern UI",
    description: "Clean, intuitive interface that's easy to use",
    mint: true,
    topcashback: false,
    rebatesme: false
  },
  {
    feature: "Privacy-first design",
    description: "Your data stays private and secure",
    mint: true,
    topcashback: false,
    rebatesme: false
  }
];

export function Comparison() {
  return (
    <div className="bg-gray-100 font-figtree">
      <div className="container max-w-6xl px-4 py-24 mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            We Fixed What <span className="text-[#39d992]">Others Didn't</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how Mint compares to other cashback platforms — we've reimagined every detail to put you first.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* TopCashback Column */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="p-8 text-center">
              <h3 className="text-xl font-medium text-gray-900">TopCashback</h3>
            </div>
            {features.map((item) => (
              <div key={item.feature} className="px-8 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-700">{item.feature}</span>
                  {item.topcashback ? (
                    <Check className="w-5 h-5 text-[#39d992]" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mint Column */}
          <div className="rounded-xl border-2 border-[#39d992] bg-white shadow-lg -mt-4 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#39d992] text-white px-4 py-1 rounded-full text-sm">
              Most Trusted
            </div>
            <div className="p-8 text-center bg-[#39d992]/5">
              <h3 className="text-xl font-medium text-gray-900">Mint Cashback</h3>
            </div>
            {features.map((item) => (
              <div key={item.feature} className="px-8 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-700">{item.feature}</span>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#39d992]" />
                    <div className="relative group cursor-help">
                      <div className="w-3.5 h-3.5 rounded-full border border-[#39d992] flex items-center justify-center text-[#39d992]">
                        <span className="text-[10px] font-medium">i</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 p-2 bg-[#39d992] text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#39d992] rotate-45"></div>
                        <p className="text-xs leading-tight">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RebatesMe Column */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="p-8 text-center">
              <h3 className="text-xl font-medium text-gray-900">RebatesMe</h3>
            </div>
            {features.map((item) => (
              <div key={item.feature} className="px-8 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-700">{item.feature}</span>
                  {item.rebatesme ? (
                    <Check className="w-5 h-5 text-[#39d992]" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
