import { Check, X } from "lucide-react";

const features = [
  {
    name: "Transparent rewards",
    description:
      "You see exactly how much cashback you earn and how we calculate it — no mystery points or hidden conditions.",
  },
  {
    name: "Low minimum redemption",
    description:
      "You only need $5 to cash out, making it easy to actually access your rewards.",
  },
  {
    name: "Popular gift cards",
    description:
      "Choose from brands you actually use — Amazon, Target, Starbucks, and more — or just get cash.",
  },
  {
    name: "Fast processing",
    description:
      "Your money is ready to withdraw within 3 days — not weeks or months like other platforms.",
  },
];

export function FeaturesTable() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-secondary">
          Why Mint?
        </h2>
        <p className="text-muted-foreground text-lg">
          Compare our features and see why we're different
        </p>
      </div>

      <div className="w-full border rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-3 bg-muted p-4 border-b">
          <div className="col-span-2 font-semibold text-black text-lg">
            Features
          </div>
          <div className="grid grid-cols-2 text-center font-semibold">
            <div className="text-secondary text-lg">Mint</div>
            <div className="text-amber-500 text-lg">Others</div>
          </div>
        </div>
        <div className="divide-y">
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 p-4 hover:bg-muted/5">
              <div className="col-span-2">
                <h4 className="font-semibold text-black text-base">
                  {feature.name}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  {feature.description}
                </p>
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <div className="bg-primary/15 rounded-full p-2">
                  <Check className="text-primary h-5 w-5" />
                </div>
                <div className="bg-amber-100 rounded-full p-2">
                  <X className="text-amber-500 h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
