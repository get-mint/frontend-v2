import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-12 rounded-2xl bg-[#2ECC71] text-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-white">
          Get Real Cash Back at 50+ Stores
        </h1>
        
        <div className="flex flex-row gap-4">
          <Button className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-2 text-lg">
            Start Saving
          </Button>
          <Button className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-2 text-lg">
            Browse Brands
          </Button>
        </div>
      </div>
    </div>
  );
}
