import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingPetals from "@/components/ui/FloatingPetals";

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  title: "लेखनी जितेंद्र की — Dr. Jitendra Kumar",
  description:
    "लेखनी जितेंद्र की — Dr. Jitendra Kumar की कविताएँ, गद्य और साहित्य। मेरठ, उत्तर प्रदेश से — हृदय की गहराइयों से उठती भावनाएँ।",
  keywords: ["Hindi poetry", "Hindi literature", "kavita", "Dr Jitendra Kumar", "Meerut", "lekhanijitendraki"],
  openGraph: {
    title: "लेखनी जितेंद्र की — Dr. Jitendra Kumar",
    description: "Hindi poetry and literature by Dr. Jitendra Kumar · lekhanijitendraki.in",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi">
      <body className="antialiased relative">
        <FloatingPetals />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
