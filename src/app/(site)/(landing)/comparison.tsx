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
    name: "Focus on Transparency",
    description:
      "We'll keep you updated every step of the way — from when your cashback is pending to when it's ready to withdraw.",
  },
  {
    name: "Get Paid Your Way",
    description:
      "Redeem your rewards for popular gift cards or straight cash — no weird points, no gimmicks.",
  },
];

export function Comparison() {
  return (
    <div className="container max-w-6xl px-4 py-24 mx-auto">
      <div className="mb-8 text-center sm:mb-10">
        <h2 className="mb-4 text-3xl font-bold sm:text-5xl">Why Mint?</h2>

        <p className="text-xl">
          Get started in just{" "}
          <span className="font-bold text-primary">three simple steps</span> and
          start earning cashback today
        </p>
      </div>

      <div className="w-full overflow-hidden bg-white border rounded-lg shadow-sm">
        <div className="grid grid-cols-3 p-4 border-b bg-muted">
          <div className="col-span-2 text-lg font-semibold text-black">
            Features
          </div>
          <div className="grid grid-cols-2 font-semibold text-center">
            <div className="text-lg text-secondary">Mint</div>
            <div className="text-lg text-amber-500">Others</div>
          </div>
        </div>
        <div className="divide-y">
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 p-4 hover:bg-muted/5">
              <div className="col-span-2">
                <h4 className="text-base font-semibold text-black">
                  {feature.name}
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <div className="p-2 rounded-full bg-primary/15">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div className="p-2 rounded-full bg-amber-100">
                  <X className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
