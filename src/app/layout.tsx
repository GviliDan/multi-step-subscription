import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi Step Subscription",
  description:
    "Experience a smooth, responsive multi-step subscription flow built with Next.js and Tailwind CSS. Sign up with ease and enjoy an intuitive user interface.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
