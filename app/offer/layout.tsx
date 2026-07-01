import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сайт за 7 дней — Миша Калинский",
  description:
    "Сайт уровня студии за 7 дней. Кастомный дизайн, свой код, CMS. В 2–3 раза дешевле студии.",
};

export default function OfferLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
