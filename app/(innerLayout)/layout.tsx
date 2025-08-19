// _app.tsx or RootLayout.tsx
"use client";
import Footer from "../components/common/footer/footer";
import Header from "../components/common/header/header";
import Sidebar from "../components/common/sidebar/sidebar";
import "../globals.scss";
import "./innerLayout.scss";
import "../../NiceModalRegistry.tsx";
import CommonLayout from "../components/common/CommonLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CommonLayout>
          <div className="mainLayout">
            <div className={`mainLayout_sidebar`}>
              <Sidebar />
            </div>
            <div className="mainLayout_rightside">
              <Header />
              <main className="mainSection">{children}</main>
              <Footer />
            </div>
            <div className="box"></div>
          </div>
        </CommonLayout>
      </body>
    </html>
  );
}
