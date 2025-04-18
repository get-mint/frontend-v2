import { Check } from "lucide-react";

const features = [
  {
    feature: "Real cash payouts",
    description: "Get paid in real money, not points",
    mint: true,
    others: false,
  },
  {
    feature: "No points, just money",
    description: "Skip the complicated point systems",
    mint: true,
    others: false,
  },
  {
    feature: "Works automatically",
    description: "No manual activation needed",
    mint: true,
    others: false,
  },
  {
    feature: "No credit card needed",
    description: "Shop normally on store websites",
    mint: true,
    others: false,
  },
  {
    feature: "Transparent 50/50 split",
    description: "We share half of what we earn",
    mint: true,
    others: false,
  }
];

export function Comparison() {
  return (
    <div className="bg-gray-100">
      <div className="container max-w-6xl px-4 py-24 mx-auto">
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="grid grid-cols-4">
            {/* Headers */}
            <div className="p-8 text-gray-900 text-xl font-medium">
              Benefits
            </div>
            <div className="p-8 text-gray-900 text-xl text-center font-medium">
              Us
            </div>
            <div className="p-8 text-gray-900 text-xl text-center font-medium">
              Competitor
            </div>
            <div className="p-8 text-gray-900 text-xl text-center font-medium">
              Competitor
            </div>

            {/* Features */}
            {features.map((item) => (
              <div key={item.feature} className="contents">
                <div className="px-8 py-6 border-t border-gray-100 flex items-center gap-2">
                  <span className="text-gray-700">{item.feature}</span>
                  <div className="relative group cursor-help">
                    <div className="w-3.5 h-3.5 rounded-full border border-[#39d992] flex items-center justify-center text-[#39d992]">
                      <span className="text-[10px] font-medium">i</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 p-1.5 bg-[#39d992] text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#39d992] rotate-45"></div>
                      <p className="text-[10px]">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-6 border-t border-gray-100 flex justify-center">
                  <Check className="w-5 h-5 text-[#39d992]" />
                </div>
                <div className="px-8 py-6 border-t border-gray-100 flex justify-center">
                  {item.others ? (
                    <Check className="w-5 h-5 text-[#39d992]" />
                  ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-gray-200" />
                  )}
                </div>
                <div className="px-8 py-6 border-t border-gray-100 flex justify-center">
                  <div className="w-5 h-5 border-2 rounded-full border-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
