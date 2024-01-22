import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  console.log(userId);

  return <div className="w-full px-2 sm:px-6">{children}</div>;
}
