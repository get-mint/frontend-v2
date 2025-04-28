import { UserHeader } from "./header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader />

      <div className="container mx-auto max-w-7xl">{children}</div>
    </>
  );
}
