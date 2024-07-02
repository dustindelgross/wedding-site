import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { UserProvider, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Header from "./components/Header";

const cormorantGaramond = Cormorant_Garamond({weight: ['300', '400', '500', '600', '700'], subsets: ['latin']});

export const metadata: Metadata = {
  title: "Dustin + Bella",
  description: "A wedding website for Dustin and Bella. Join us for our wedding celebration!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <UserProvider>
        <body className={cormorantGaramond.className}>
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
};