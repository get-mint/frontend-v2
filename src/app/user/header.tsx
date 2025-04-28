import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


export function UserHeader() {
  return (
    <Header>
      <div className="flex flex-row items-center justify-center flex-1 gap-3 p-1 transition-all border rounded-full border-border hover:border-primary hover:ring-1 hover:ring-primary focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
        <Input 
          placeholder="Search for brands" 
          className="w-full h-full pl-3 m-0 font-medium bg-transparent border-none rounded-none shadow-none appearance-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none active:ring-0 active:outline-none active:border-none hover:ring-0 hover:outline-none hover:border-none" 
        />
        <Button size="icon">
          <Search />
        </Button>
      </div>

      Temporary placeholder to push the search bar to the left
    </Header>
  );
}
