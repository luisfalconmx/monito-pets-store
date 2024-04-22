import localFont from "next/font/local";
import type { Metadata } from "next";
import { Navbar } from "@/components";
import "@/styles/globals.css";

// Font files can be colocated inside of `app`
const GilroyFont = localFont({
  src: [
    {
      path: "../assets/fonts/gilroy.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/gilroy-bold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monito Pets Store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GilroyFont.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
