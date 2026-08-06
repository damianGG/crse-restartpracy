import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/assets/scss/style.scss";
import NavbarOne from "@/components/blocks/navbar/navbar-1/NavbarOne";
import Footer2 from "@/components/blocks/footer/Footer2";
import AccessibilityButton from "@/components/reuseable/AccessibilityButton";
import { projectTitle } from "@/data/project";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: projectTitle,
  description: projectTitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" data-bs-theme="light">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/ico/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ico/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ico/favicon-16x16.png" />
        <link rel="manifest" href="/ico/site.webmanifest" />
        <link rel="mask-icon" href="/ico/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={manrope.className}>
        <NavbarOne />
        <AccessibilityButton />
        <div>{children}</div>
        <Footer2 />
      </body>
    </html>
  );
}
