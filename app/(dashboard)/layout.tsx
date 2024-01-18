import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <div className="h-full bg-background pb-8">
      <div className="h-[80px] md:pl-56 fixed w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] pb-[20px] h-dvh bg-background">
        {children}
      </main>
      <footer className="absolute w-full bottom-[-100px] flex justify-center flex-wrap items-center md:pl-56 h-[100px] bg-background border-t">
        <p className="">{`Copyright ©${new Date().getFullYear()}`}</p>
        <a href="https://robertzuk.pl">Robet Żuk&nbsp;</a>
        <p> All Rights Reserved.</p>
      </footer>
    </div>
  );
}
