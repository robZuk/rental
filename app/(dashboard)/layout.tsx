import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

// import { auth } from "@clerk/nextjs";

// import Navbar from "@/app/(dashboard)/_components/navbar";
// import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}
