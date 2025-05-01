import Balance from "./balance";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg font-medium text-muted-foreground">
          Track your savings, unlock rewards, and watch your cash grow
        </p>
      </div>

      <Balance />
    </>
  )
}
