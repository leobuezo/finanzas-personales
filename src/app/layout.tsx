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
        <div className="flex min-h-screen flex-col bg-background">
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 sm:h-16">
              <div className="flex items-center gap-2">
                <span className="text-xl" role="img" aria-label="money">
                  💰
                </span>
                <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                  Finanzas Personales
                </h1>
              </div>
            </div>
          </header>
          <main className="container flex-1 px-4 py-6 sm:py-8">
            {children}
          </main>
          <footer className="border-t py-4">
            <div className="container px-4">
              <p className="text-center text-xs text-muted-foreground">
                Finanzas Personales &mdash; MVP con Next.js 14, TypeScript y
                shadcn/ui
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
