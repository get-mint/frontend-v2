import { Check, X } from "lucide-react";

const features = [
  {
    name: "Transparent rewards",
    description: "You see exactly how much cashback you earn and how we calculate it — no mystery points or hidden conditions.",
  },
  {
    name: "Low minimum redemption",
    description: "You only need $5 to cash out, making it easy to actually access your rewards.",
  },
  {
    name: "Popular gift cards",
    description: "Choose from brands you actually use — Amazon, Target, Starbucks, and more — or just get cash.",
  },
  {
    name: "Fast processing",
    description: "Your money is ready to withdraw within 3 days — not weeks or months like other platforms.",
  },
];

export function FeaturesTable() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="w-full border rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-3 bg-muted p-4 border-b">
          <div className="col-span-2 font-medium">Features</div>
          <div className="grid grid-cols-2 text-center font-medium">
            <div className="text-secondary">Mint</div>
            <div className="text-muted-foreground">Others</div>
          </div>
        </div>
        <div className="divide-y">
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 p-4 hover:bg-muted/5">
              <div className="col-span-2">
                <h4 className="font-medium">{feature.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <Check className="text-secondary h-5 w-5" />
                <X className="text-muted-foreground h-5 w-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 