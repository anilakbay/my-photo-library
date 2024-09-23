import "@/app/globals.css";
import { Image as IconImage } from "lucide-react"; // 'Image' ismini değiştir

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SidebarLinks from "@/components/SidebarLinks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Nav />
      <main className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[12rem_auto]">
        <aside className="md:my-6">
          <SidebarLinks
            links={[
              {
                icon: <IconImage className="w-5 h-5" />, // Burada ismi değiştirdik
                label: "Photos",
                path: "/",
              },
            ]}
          />
        </aside>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
