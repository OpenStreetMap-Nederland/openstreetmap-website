import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/toaster";
import { Header } from "@/components/header/header";
import { NextAuthProvider } from "@/lib/next-auth-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "OpenStreetMap",
  referrer: "origin-when-cross-origin",
  keywords: [
    "OpenStreetMap",
    "OSM",
    "OpenStreetMap Nederland",
    "Gratis kaart",
    "Kaarten",
  ],
  creator: "OpenStreetMap Nederland",
  publisher: "OpenStreetMap Nederland",
  title: "OpenStreetMap",
  description:
    "Open street map is a map of the world, made by people like you and free to use under an open license.",
  metadataBase: new URL("https://osmnl.vercel.app/"),
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }

interface RootLayoutProps {
  children: React.ReactNode;
  pageProps: any;
}

export default function RootLayout({ children, pageProps }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          <NextAuthProvider session={pageProps?.session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col h-screen">
                <Header />
                {children}
                {/* <Footer /> */}
              </div>
              {/* <TailwindIndicator /> */}
            </ThemeProvider>
            {/* <ThemeSwitcher /> */}
            <Toaster />
          </NextAuthProvider>
          <Analytics />
        </body>
      </html>
    </>
  );
}
