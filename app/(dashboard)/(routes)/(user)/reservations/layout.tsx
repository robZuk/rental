export default async function ReservatiosLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return <div className="w-full px-2 sm:px-6">{children}</div>;
}
