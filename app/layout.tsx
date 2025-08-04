import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from './components/SideBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div style={{ display: "flex" }}>
          <div 
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "100vh",
              width: 70,
              zIndex: 100,
              background: "#181818",
              borderRight: "1px solid #222"
            }}
          >
            <SideBar />
          </div>
          <main style={{ marginLeft: 70, flex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
