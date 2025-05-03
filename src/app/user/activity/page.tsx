import ActivityTransactions from "./transactions";

export default function Activity() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Activity</h1>
      <ActivityTransactions />
    </div>
  );
}

