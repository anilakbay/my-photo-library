import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers"; // Varsayılan export olduğu için 'default import' kullanıyoruz

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudinary Photos",
  description: "Image and video library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
