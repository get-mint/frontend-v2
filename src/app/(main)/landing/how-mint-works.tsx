import { createAdminClient } from "@/lib/supabase/server/server";
import type { Database } from "@/types/supabase";
import { Headphones, Search } from "lucide-react";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

const steps = [
  {
    title: "1. Join for free",
    description: "Install Mint, enter your email, and start shopping.",
    renderContent: ({
      brands,
      totalStores,
    }: {
      brands: Advertiser[];
      totalStores: number;
    }) => (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-full shadow-sm p-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-gray-500">
            Shop {totalStores.toLocaleString()}+ stores
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 max-h-[180px] overflow-hidden">
          {brands.slice(0, 12).map((brand) => (
            <div
              key={brand.id}
              className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center"
            >
              <div className="w-12 h-12 relative">
                <img
                  src={brand.image_url || "/placeholder.svg"}
                  alt={brand.name}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2. Start earning cash back",
    description: "Shop at your favorite stores and earn cash back.",
    renderContent: ({}: { brands: Advertiser[]; totalStores: number }) => (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="bg-yellow-100 rounded-lg w-full h-32 mb-4 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <Headphones className="w-12 h-12 text-gray-700" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Noise Cancelling Headphones</span>
              <span className="text-green-600">$25.00 Cash Back</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>$250.00</span>
              <span>QTY 1</span>
            </div>
            <button className="w-full bg-black text-white rounded-lg py-2 mt-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "3. Redeem your cash back",
    description:
      "Redeem your cash back for rewards in the form of gift cards, PayPal, Venmo & more.",
    renderContent: ({}: { brands: Advertiser[]; totalStores: number }) => (
      <div className="p-4 flex flex-col space-y-4">
        <div className="bg-[#0070BA] text-white p-4 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold">PayPal</span>
        </div>
        <div className="bg-[#F5F5F5] p-4 rounded-lg relative overflow-hidden border border-gray-200">
          <div className="absolute top-2 right-2">
            <span className="text-xs text-gray-500">4564332</span>
          </div>
          <div className="space-y-2 text-gray-700">
            <div className="text-sm">Pay to the order of:</div>
            <div className="font-semibold">Savvy Shopper</div>
            <div className="flex justify-between items-center mt-4">
              <span>Amount:</span>
              <span className="text-xl font-bold">$46</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export async function HowMintWorks() {
  let brands: Advertiser[] = [];
  let totalStores = 0;

  try {
    const supabase = createAdminClient();

    // Fetch total count of active stores
    const { count: storeCount } = await supabase
      .from("advertisers")
      .select("*", { count: "exact", head: true })
      .eq("active", true);

    // Fetch brands for display
    const { data, error } = await supabase
      .from("advertisers")
      .select("*")
      .eq("active", true)
      .order("name")
      .limit(12);

    if (error) {
      console.error("Error fetching brands:", error.message);
    } else if (data) {
      brands = data;
      totalStores = storeCount || 0;
    }
  } catch (error) {
    console.error("Failed to fetch brands:", error);
  }

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
        Here's how Mint works
      </h2>

      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {steps.map((step) => (
          <div key={step.title}>
            <div className="w-full h-64 bg-primary/40 rounded-xl overflow-hidden">
              {step.renderContent({ brands, totalStores })}
            </div>
            <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
