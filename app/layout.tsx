import type { Metadata } from "next";
import DemoAuthProvider from "./providers/DemoAuthProvider";
import AppNav from "./ui/AppNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Колибри",
  description: "Учебный проект на Next.js: сервис буккроссинга",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <DemoAuthProvider>
          <AppNav />
          {children}
        </DemoAuthProvider>
      </body>
    </html>
  );
}
