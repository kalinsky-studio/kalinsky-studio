"use client";

import { useState } from "react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import "./offer.css";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-oswald",
});

const ease = [0.16, 1, 0.3, 1] as const;

const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const viewport = { once: true, margin: "-40px" } as const;

const TG = "https://t.me/mishegface";

const stats = [
  { val: "7 дней", label: "вместо 1–2 месяцев" },
  { val: "×2–3", label: "дешевле студии" },
  { val: "100%", label: "свой код — не конструктор" },
  { val: "0 ₽", label: "за правки контента после сдачи" },
];

const marqueeItems = ["Лендинги", "Сайты под ключ", "Айдентика", "CMS", "Telegram-боты", "Ребрендинг"];

const pains = [
  {
    label: "Вариант 1",
    title: "Студия",
    text: "200–500 тыс. ₽ и 1–2 месяца. Менеджер, аккаунт, дизайнер, разработчик — каждая правка идёт по цепочке и стоит денег. Смысл теряется при передаче между отделами.",
  },
  {
    label: "Вариант 2",
    title: "Фрилансер",
    text: "Дешевле, но «уникальный дизайн» оказывается шаблоном с Тильды. Сроки плывут, а после оплаты исполнитель растворяется — и любая правка превращается в квест.",
  },
  {
    label: "Вариант 3",
    title: "Конструктор",
    text: "Быстро и почти бесплатно, но сайт выглядит как у всех и живёт на чужой платформе с подпиской. Шаблонные страницы конвертируют в среднем 3,8% против 11,6% у кастомных.",
  },
];

const pipeline = [
  {
    num: "01",
    title: "Созвон и бриф",
    text: "30 минут. Кто вы, для кого сайт, что должно произойти после визита. Оценка и фикс-цена — в тот же день, бесплатно.",
  },
  {
    num: "02",
    title: "Прототип за 1–2 дня",
    text: "Кликабельный прототип с вашим контентом — не «вайрфрейм из квадратиков». Правки на этом этапе — без доплат.",
  },
  {
    num: "03",
    title: "Сборка",
    text: "Код на Next.js из утверждённого макета, анимации, CMS. Вы видите живую ссылку с первого дня сборки.",
  },
  {
    num: "04",
    title: "Запуск и передача",
    text: "Домен, аналитика, обучение по CMS за 1 час. Отдаю доступы и репозиторий — сайт ваш целиком.",
  },
];

const uses = [
  {
    num: "01",
    span: "span4",
    title: "Запуск продукта или услуги",
    text: "Лендинг под запуск за неделю: оффер, структура, дизайн, домен, аналитика. Пока конкуренты согласовывают макет со студией — вы уже собираете заявки и тестируете спрос на живом трафике.",
    who: "стартапы · новые услуги · MVP",
  },
  {
    num: "02",
    span: "span2",
    title: "Локальный бизнес",
    text: "Салон, клиника, кофейня, автосервис. Цены, фото и акции меняете сами в CMS — без программиста и абонентки.",
    who: "офлайн-бизнес",
  },
  {
    num: "03",
    span: "span2",
    title: "Личный бренд",
    text: "Сайт-визитка эксперта: кейсы, отзывы, блог. Новая статья публикуется сообщением в Telegram — сайт живёт, пока вы работаете.",
    who: "юристы · психологи · фотографы · коучи",
  },
  {
    num: "04",
    span: "span4",
    title: "Ребрендинг под ключ",
    text: "Айдентика в Figma превращается в дизайн-систему, из которой автоматически собираются сайт, презентации и брендбук — в едином стиле, без «дизайнерского испорченного телефона». Обновили бренд — обновилось всё.",
    who: "компании при смене позиционирования",
  },
  {
    num: "05",
    span: "span3",
    title: "Событие или курс",
    text: "Страница с программой, спикерами и оплатой — к жёсткому дедлайну. Успеем до анонса, а не после него. Правки в день обращения, пока идут продажи.",
    who: "конференции · курсы · инфопродукты",
  },
  {
    num: "06",
    span: "span3",
    title: "Корпоративный сайт с блогом",
    text: "Next.js + Sanity: быстрый, безопасный, готовый к SEO. Контент ведёт ваш маркетолог в удобной админке, а не подрядчик по выставленному счёту.",
    who: "малый и средний бизнес",
  },
];

const compareRows: { label: string; cells: string[] }[] = [
  {
    label: "Цена",
    cells: ["15–45 тыс. ₽/год подписки", "20–80 тыс. ₽", "200–500 тыс. ₽", "60–250 тыс. ₽, фикс"],
  },
  {
    label: "Срок",
    cells: ["сами, по вечерам", "2–4 недели, если повезёт", "1–2 месяца", "5–14 дней"],
  },
  {
    label: "Дизайн",
    cells: ["шаблон", "шаблон или полукастом", "кастомный", "кастомный, под ваш бренд"],
  },
  {
    label: "Код и владение",
    cells: ["чужая платформа", "как повезёт", "свой код", "свой код + репозиторий вам"],
  },
  {
    label: "Контент после сдачи",
    cells: ["сами в конструкторе", "за доплату исполнителю", "за доплату по договору", "сами в CMS или через Telegram-бота"],
  },
];

const plans = [
  {
    name: "Лендинг",
    price: "60 000 ₽",
    term: "5–7 дней",
    featured: false,
    items: [
      "одна страница под конкретную цель",
      "кастомный дизайн и анимации",
      "форма заявок / привязка к Telegram",
      "домен, деплой, базовое SEO",
      "2 раунда правок включены",
    ],
  },
  {
    name: "Сайт + CMS",
    price: "120 000 ₽",
    term: "10–14 дней",
    featured: true,
    items: [
      "до 6 страниц + блог",
      "Sanity CMS: меняете контент сами",
      "кастомный дизайн, анимации",
      "обучение по CMS — 1 час",
      "месяц поддержки после запуска",
    ],
  },
  {
    name: "Бренд + сайт",
    price: "250 000 ₽",
    term: "от 3 недель",
    featured: false,
    items: [
      "айдентика: лого, цвета, шрифты",
      "дизайн-система в Figma",
      "сайт до 8 страниц + CMS",
      "брендбук и шаблоны для соцсетей",
      "всё в едином стиле — автоматически",
    ],
  },
];

const faq = [
  {
    q: "Почему так быстро? Это шаблоны?",
    a: (
      <>
        Нет. Дизайн собирается под вашу задачу и бренд. Быстро — потому что автоматизирована рутина: перенос макета в код, вёрстка, деплой. То, на что студия тратит недели работы junior-разработчика, у меня занимает часы. <strong>Думаю я — печатает машина.</strong>
      </>
    ),
  },
  {
    q: "Что если дизайн не понравится?",
    a: "Прототип вы видите на 1–2 день — до того, как написана хоть строчка кода. Правки на этапе прототипа не ограничены и включены в цену. В код уходит только утверждённый вами макет.",
  },
  {
    q: "Чей сайт после сдачи?",
    a: (
      <>
        <strong>Ваш целиком.</strong> Домен на вас, код в вашем репозитории, доступы к CMS и хостингу у вас. Никакой подписки «за платформу» и зависимости от меня. Захотите — любой разработчик продолжит работу.
      </>
    ),
  },
  {
    q: "Что с поддержкой после запуска?",
    a: "Месяц поддержки включён в тарифы с CMS: правки, консультации, мелкие доработки. Дальше — контент вы меняете сами (CMS или Telegram-бот), а для новых фич договариваемся отдельно, по фикс-цене за задачу.",
  },
  {
    q: "Как проходит оплата?",
    a: "50% после утверждения прототипа, 50% при передаче. Цена фиксируется до старта работ и не меняется в процессе — риски скорости на моей стороне, а не на вашей.",
  },
];

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
      <motion.div className="section-eyebrow" variants={fadeUp}>{eyebrow}</motion.div>
      <motion.h2 className="section-title" variants={fadeUp}>{title}</motion.h2>
    </motion.div>
  );
}

export default function OfferPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`offer ${oswald.variable}`}>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="nav-author">Миша Калинский</span>
        <div className="nav-links">
          <a href="#uses" className="nav-link">Применения</a>
          <a href="#price" className="nav-link">Цены</a>
          <a href="#process" className="nav-link">Процесс</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <a className="nav-cta" href={TG} target="_blank" rel="noopener noreferrer">Обсудить проект</a>
      </motion.nav>

      {/* HERO */}
      <section id="hero">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div className="hero-eyebrow" variants={fadeUp}>
            Дизайн · Разработка · Брендинг — на AI-конвейере
          </motion.div>
          <h1 className="hero-h1">
            <span className="lm"><motion.span className="li" variants={maskUp}>Сайт уровня</motion.span></span>
            <span className="lm"><motion.span className="li" variants={maskUp}>студии —</motion.span></span>
            <span className="lm"><motion.span className="li accent" variants={maskUp}>за 7 дней</motion.span></span>
          </h1>
          <motion.p className="hero-sub" variants={fadeUp}>
            Кастомный дизайн, свой код и CMS, в которой вы <strong>сами меняете контент</strong>.
            Без студийного ценника в 300&nbsp;000&nbsp;₽ и без двух месяцев согласований.
          </motion.p>
          <motion.div className="hero-ctas" variants={fadeUp}>
            <a className="btn-primary" href={TG} target="_blank" rel="noopener noreferrer">Обсудить проект →</a>
            <a className="btn-ghost" href="#uses">Что можно сделать</a>
          </motion.div>
          <motion.div className="hero-stats" variants={stagger}>
            {stats.map((s) => (
              <motion.div key={s.val} className="hero-stat" variants={fadeUp}>
                <div className="hero-stat-val">{s.val}</div>
                <div className="hero-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((track) => (
          <div key={track} className="marquee-track">
            {marqueeItems.map((item) => (
              <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "inherit" }}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-dot" style={{ marginLeft: "clamp(24px, 4vw, 48px)" }}>●</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* PAIN */}
      <section className="section" id="pain">
        <SectionHead eyebrow="01 / знакомо?" title="Почему сайты делаются месяцами и стоят как машина" />
        <motion.div className="pain-grid" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
          {pains.map((p) => (
            <motion.div key={p.title} className="pain-card" variants={fadeUp}>
              <div className="pain-card-label">{p.label}</div>
              <div className="pain-card-title">{p.title}</div>
              <div className="pain-card-text">{p.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PIPELINE */}
      <section className="section" id="process" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="02 / почему у меня быстрее" title="Конвейер вместо конторы" />
        <motion.p
          className="section-lead"
          initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}
        >
          Я собрал процесс из Figma, Claude и Cursor: дизайн-система применяется автоматически, код генерируется прямо из макета, деплой — одной командой.{" "}
          <strong>Автоматизирована рутина, а не мышление:</strong> смыслы, структура и дизайн — руками. Поэтому дни вместо месяцев — без потери качества.
        </motion.p>
        <motion.div className="pipe-row" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
          {pipeline.map((s) => (
            <motion.div key={s.num} className="pipe-step" variants={fadeUp}>
              <span className="pipe-num">{s.num}</span>
              <div className="pipe-title">{s.title}</div>
              <div className="pipe-text">{s.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* USES */}
      <section className="section" id="uses" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="03 / применения" title="6 задач, которые это решает" />
        <motion.div className="uses-grid" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
          {uses.map((u) => (
            <motion.div key={u.num} className={`use-card ${u.span}`} variants={fadeUp}>
              <div className="use-num">{u.num}</div>
              <div className="use-title">{u.title}</div>
              <div className="use-text">{u.text}</div>
              <div className="use-who">{u.who}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* COMPARE */}
      <section className="section" id="compare" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="04 / честная математика" title="Что вы получаете за свои деньги" />
        <motion.div className="compare-wrap" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <table className="compare">
            <thead>
              <tr>
                <th></th>
                <th>Конструктор</th>
                <th>Фрилансер</th>
                <th>Студия</th>
                <th className="me">Мой подход</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={i === row.cells.length - 1 ? "me" : undefined}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* PRICING */}
      <section className="section" id="price" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="05 / тарифы" title="Цены" />
        <motion.div className="price-grid" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
          {plans.map((p) => (
            <motion.div key={p.name} className={`price-card${p.featured ? " featured" : ""}`} variants={fadeUp}>
              {p.featured && <div className="price-badge">берут чаще всего</div>}
              <div className="price-name">{p.name}</div>
              <div className="price-val"><span className="from">от </span>{p.price}</div>
              <div className="price-term">{p.term}</div>
              <ul className="price-list">
                {p.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a className="price-cta" href={TG} target="_blank" rel="noopener noreferrer">Занять слот →</a>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="price-upsell" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <div>
            <div className="price-upsell-title">+ Hermes: сайт в Telegram</div>
            <div className="price-upsell-text">
              Бот, который публикует статьи, меняет тексты и цены на сайте по сообщению в Telegram. Для тех, кто не хочет заходить даже в CMS.
            </div>
          </div>
          <div className="price-upsell-val">от 30 000 ₽</div>
        </motion.div>
        <motion.div className="price-note" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          Цена фиксируется после брифа и <span className="accent">не растёт в процессе</span> · оплата этапами 50/50 · правки внутри этапа — включены
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="06 / вопросы" title="Что обычно спрашивают" />
        <motion.div className="faq-list" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          {faq.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q} className={`faq-item${open ? " open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}>
                  {item.q}
                  <span className="x">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="faq-a"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div className="faq-a-inner">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="section" id="contact">
        <div className="final-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <Image
              src="/misha-photo.jpg"
              alt="Миша Калинский"
              width={300}
              height={300}
              className="final-photo"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
            <motion.div className="section-eyebrow" variants={fadeUp}>07 / кто делает</motion.div>
            <motion.h2 className="final-title" variants={fadeUp}>
              Один человек. <span className="accent">Весь проект.</span>
            </motion.h2>
            <motion.p className="final-text" variants={fadeUp}>
              Я — Миша Калинский, дизайнер и разработчик в одном лице. Вы объясняете задачу <strong>один раз</strong> — и её не пересказывают по цепочке менеджер → дизайнер → верстальщик. Поэтому быстро, без потерь смысла и без «сломанного телефона».
            </motion.p>
            <motion.div variants={fadeUp}>
              <a className="btn-primary" href={TG} target="_blank" rel="noopener noreferrer">Рассказать о задаче →</a>
              <div className="final-note">Отвечаю в течение дня · бриф и оценка — бесплатно · @mishegface</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Миша Калинский</span>
          <a href={TG} target="_blank" rel="noopener noreferrer">Telegram → @mishegface</a>
        </div>
      </footer>
    </div>
  );
}
