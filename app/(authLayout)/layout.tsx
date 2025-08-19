import "../globals.scss";
import type { Metadata } from "next";
import { headers } from "next/headers";
import CommonLayout from "../components/common/CommonLayout";

export const metadata: Metadata = {
  title: "Ponitech Admin",
  description: "The Next-Gen Decentralized Platform Where Speed Meets Scale",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const cookies = headerList.get("cookie");

  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0,  user-scalable=0, shrink-to-fit=no"
      />
      <body>
        <main className="auth_layout">
          <CommonLayout cookies={cookies}>{children}</CommonLayout>
        </main>
      </body>
    </html>
  );
}
