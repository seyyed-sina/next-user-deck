import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/layouts/Providers";

import "@/styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User List Application",
  description: "A user list application with filtering and favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
