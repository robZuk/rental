import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";

export default async function EquipmentsLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  if (!isAdmin(userId)) {
    redirect("/");
  }

  return <div className="w-full px-2 sm:px-6">{children}</div>;
}
