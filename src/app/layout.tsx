import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Your Love",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return children;
}