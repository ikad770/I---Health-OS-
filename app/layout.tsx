import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I — Your Personal Health OS",
  description: "Futuristic multilingual health operating system MVP"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
