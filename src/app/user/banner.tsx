import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <div className="flex flex-row items-center w-full p-8 rounded-2xl bg-gradient-to-tr from-primary to-primary/60">
      <div className="flex flex-col gap-3">
        <span className="text-4xl font-extrabold text-primary-foreground">
          How to Use Mint
        </span>
        
        <span className="text-lg text-primary-foreground">
          Easy steps to get started
        </span>
        
        <Button className="bg-primary-foreground text-foreground hover:bg-primary-foreground">
          Get Started
        </Button>
      </div>
    </div>
  );
}
