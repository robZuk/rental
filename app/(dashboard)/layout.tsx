import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Footer } from "./_components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-background pb-8">
      <div className="h-[80px] md:pl-56 fixed w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-dvh min-h-[100vh] bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
