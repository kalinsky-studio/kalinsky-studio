import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workflow — Миша Калинский",
  description: "От брифа до деплоя: 7 шагов, 8 инструментов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
