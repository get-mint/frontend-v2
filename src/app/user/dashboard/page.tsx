import Balance from "./balance";
import Transactions from "./transactions";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg font-medium text-muted-foreground">
          Track your savings, unlock rewards, and watch your cash grow
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Balance />
        <Transactions />
      </div>
    </>
  )
}
