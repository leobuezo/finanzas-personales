import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Finanzas Personales",
  description: "Aplicación de manejo de finanzas personales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container flex h-16 items-center px-4">
              <h1 className="text-xl font-bold tracking-tight">
                Finanzas Personales
              </h1>
            </div>
          </header>
          <main className="container px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
