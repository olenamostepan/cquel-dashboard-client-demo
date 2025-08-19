import type { Metadata } from "next";
import { Wix_Madefor_Display } from "next/font/google";
import "./globals.css";

// Wix Madefor Display
const madeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-wix",
});

export const metadata: Metadata = {
  title: "CQuel Dashboard",
  description: "CQuel Projects Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${madeforDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
