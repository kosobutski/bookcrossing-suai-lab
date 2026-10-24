import type { Metadata, Viewport } from "next";
import DemoAuthProvider from "./providers/DemoAuthProvider";
import BurgerMenu from "./ui/BurgerMenu/BurgerMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Колибри",
  description: "Учебный проект на Next.js: сервис буккроссинга",
};

// width=device-width и initial-scale=1 Next.js добавляет сам,
// здесь задаются только цвет темы и цветовая схема.
export const viewport: Viewport = {
  themeColor: "#ededed",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <DemoAuthProvider>
          <BurgerMenu />
          {children}
        </DemoAuthProvider>
      </body>
    </html>
  );
}
