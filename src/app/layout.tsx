import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Provider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Next App",
  description: "My Next Auth Mapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <nav className="w-full bg-black shadow-sm">
            <div className="mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="text-xl font-semibold">
                MyAuthApp
              </Link>
              <NavMenu />
            </div>
          </nav>

          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}