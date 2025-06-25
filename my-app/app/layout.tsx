import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Punpun's Personal Website",
  description: "This is my personal website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
