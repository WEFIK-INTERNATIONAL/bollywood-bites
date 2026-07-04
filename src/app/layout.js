import { Host_Grotesk, DM_Mono } from "next/font/google";

import ClientLayout from "@/client-layout";

import Script from "next/script";

import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata = {
  title: "Bollywood Bites | Modern Indian Cuisine",
  description:
    "Experience the vibrant flavours, fine ingredients, and culinary essence of modern Indian dining at Bollywood Bites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.variable} ${dmMono.variable}`}>
        <Script
          src="https://www.fbgcdn.com/embedder/js/ewm2.js"
          strategy="afterInteractive"
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
