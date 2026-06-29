import Image from "next/image";
import { Oswald } from "next/font/google";
import "./workflow.css";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "Workflow — Миша Калинский",
  description: "От брифа до деплоя: 7 шагов, 8 инструментов",
};

const tools = [
  {
    name: "Figma",
    what: "Дизайн и прототип",
    how: "Рисуешь макет руками. Claude через Figma MCP читает твой файл и собирает из него код. Токены (цвета, шрифты) — через Figma Variables.",
    status: "ready",
    statusText: "● Уже есть",
  },
  {
    name: "Claude",
    what: "Мозг всего процесса",
    how: "Принимает бриф, подбирает компоненты из библиотек, размещает прототип в Figma, помогает писать и редактировать код в Cursor.",
    status: "ready",
    statusText: "● Уже есть",
  },
  {
    name: "Claude Design",
    what: "Прототип и брендбук без Figma",
    how: "Описываешь бренд или задачу — Claude Design собирает интерактивный прототип страницы, брендбук или презентацию. Читает твои файлы и кодбейс, автоматически применяет цвета, шрифты и компоненты клиента. Готовое отдаёт в Cursor/Claude Code одной командой или экспортирует в PDF, PPTX, HTML, Canva.",
    status: "need",
    statusText: "○ Доступен на Pro / Max",
  },
  {
    name: "Cursor",
    what: "Редактор кода с AI",
    how: "Читает Figma через MCP и превращает макет в React-компоненты. Ты не пишешь код с нуля — правишь то что сгенерировано.",
    status: "need",
    statusText: "○ Нужно установить",
  },
  {
    name: "Sanity",
    what: "CMS — управление контентом",
    how: "Клиент меняет тексты и фото на сайте без тебя и без кода. Ты настраиваешь один раз — клиент пользуется сам.",
    status: "need",
    statusText: "○ Нужно подключить",
  },
  {
    name: "Next.js",
    what: "Фреймворк для сайта",
    how: "На нём строится сайт. Cursor генерирует компоненты именно под Next.js. Работает вместе с Sanity и Vercel.",
    status: "need",
    statusText: "○ Настроить в проекте",
  },
  {
    name: "Vercel",
    what: "Хостинг и деплой",
    how: "Пушишь код в GitHub — сайт обновляется автоматически. Домен, SSL, аналитика — всё включено. Бесплатный план покрывает большинство проектов.",
    status: "need",
    statusText: "○ Подключить домен",
  },
  {
    name: "Hermes",
    what: "Агент управления сайтом для клиента",
    how: "Клиент пишет в Telegram — бот публикует статью в блог, правит текст на сайте, добавляет новый материал. Всё через Sanity API без входа в CMS. Подключается как дополнительная услуга поверх готового сайта.",
    status: "need",
    statusText: "○ Отдельная услуга",
  },
];

const steps = [
  {
    num: "1",
    badge: "AI",
    title: "Бриф",
    desc: "Описываешь задачу Claude: кто клиент, что делает, какие цели, есть ли уже бренд или нужно делать с нуля. Claude задаёт уточняющие вопросы и формирует структуру — какие блоки нужны, какой тон, какой результат. Если нужна айдентика — сначала делаешь её в Figma, загружаешь в Claude Design как дизайн-систему. Дальше она применяется автоматически к каждому проекту.",
    tools: ["Claude", "Figma", "Claude Design"],
  },
  {
    num: "2",
    badge: "AI",
    title: "Прототип — два пути",
    desc: (
      <>
        <strong>Путь А — Claude Design:</strong> описываешь страницу или бренд текстом. Claude Design сразу собирает интерактивный прототип с реальными компонентами, применяет токены бренда. Правишь через комментарии прямо внутри — без Figma. Когда готово — одной командой передаёшь в Cursor.
        <br /><br />
        <strong>Путь Б — Figma + Claude MCP:</strong> Claude подбирает блоки из библиотек (shadcn/ui, 21st.dev, Aceternity) и размещает их в твоём Figma-файле с аннотациями. Используй этот путь когда нужен точный контроль над каждым элементом или клиент уже работает в Figma.
      </>
    ),
    tools: ["Claude Design", "или", "Figma MCP", "shadcn/ui", "21st.dev"],
  },
  {
    num: "3",
    badge: "Руками",
    title: "Правки в Figma",
    desc: "Открываешь прототип, меняешь что не подходит: переставляешь блоки, подставляешь реальный контент клиента, применяешь цвета и шрифты бренда через Variables. Здесь же помечаешь где нужна анимация — это уйдёт в код на следующем шаге. 1–2 часа.",
    tools: ["Figma", "Figma Variables"],
  },
  {
    num: "4",
    badge: "Авто",
    title: "Figma → код",
    desc: "Cursor читает твой Figma-файл через MCP и генерирует React-компоненты. Компоненты уже из библиотеки — код существует, Cursor только подставляет контент и токены. После сборки добавляешь анимации через Framer Motion — по пометкам из Figma.",
    tools: ["Cursor", "Figma MCP", "Next.js", "Framer Motion"],
  },
  {
    num: "5",
    badge: "Авто",
    title: "Подключить Sanity",
    desc: "Создаёшь проект на sanity.io, описываешь схему — что клиент сможет редактировать сам: тексты, фото, блог. Подключаешь к Next.js. Клиент заходит в Sanity Studio и меняет контент без тебя.",
    tools: ["Sanity", "Next.js"],
  },
  {
    num: "6",
    badge: "Авто",
    title: "Деплой и передача",
    desc: "Пушишь в GitHub — Vercel подхватывает и публикует сайт автоматически. Подключаешь домен клиента. Передаёшь доступ к Sanity Studio — клиент сам управляет контентом.",
    tools: ["GitHub", "Vercel", "Sanity Studio"],
  },
  {
    num: "7",
    badge: "Опционально — для клиента",
    title: "Telegram-бот для управления сайтом",
    desc: "Если клиент хочет управлять сайтом без входа в CMS — подключаешь Hermes. Клиент пишет боту в Telegram: «добавь статью», «измени текст на главной», «опубликуй пост» — бот делает это через Sanity API. Это отдельная услуга поверх готового сайта.",
    tools: ["Hermes", "Telegram Bot API", "Sanity API"],
  },
];

const installItems = [
  {
    name: "Claude Design",
    desc: "Открыть на claude.ai — раздел Design. Доступен на плане Pro и выше. При первом входе загружаешь файлы бренда или кодбейс — Claude строит дизайн-систему.",
    order: "→ Первое",
  },
  {
    name: "Cursor",
    desc: "Скачать на cursor.com. Бесплатный план есть. Без него шаг 4 невозможен.",
    order: "→ Второе",
  },
  {
    name: "Figma MCP",
    desc: "Плагин который связывает Figma с Claude и Cursor. Устанавливается в настройках Cursor через MCP-серверы.",
    order: "→ Третье",
  },
  {
    name: "GitHub",
    desc: "Нужен для деплоя на Vercel. Создать репозиторий под каждый проект.",
    order: "→ Четвёртое",
  },
  {
    name: "Vercel",
    desc: "Подключить аккаунт на vercel.com через GitHub. Бесплатно. Деплой происходит автоматически при каждом пуше.",
    order: "→ Пятое",
  },
  {
    name: "Sanity",
    desc: "Создать проект на sanity.io. Бесплатный план покрывает всё. Схему настраиваешь после того как сайт собран.",
    order: "→ Шестое",
  },
];

export default function WorkflowPage() {
  return (
    <div className={`wf ${oswald.variable}`}>
      <nav>
        <span className="nav-author">Миша Калинский</span>
        <div className="nav-links">
          <a href="#tools" className="nav-link">Инструменты</a>
          <a href="#steps" className="nav-link">Шаги</a>
          <a href="#install" className="nav-link">С чего начать</a>
        </div>
      </nav>

      {/* COVER */}
      <section id="cover">
        <div className="cover-photo-block">
          <Image
            src="/misha-photo.jpg"
            alt="Миша Калинский"
            width={300}
            height={300}
            className="cover-photo"
            priority
          />
          <div className="cover-name-block">
            <div className="cover-name">
              Миша<br />Калинский
            </div>
            <div className="cover-role">Дизайн · Разработка · Брендинг</div>
          </div>
        </div>

        <div
          className="cover-h1"
          style={{
            fontSize: "clamp(36px, 7vw, 80px)",
            padding: "0 0 clamp(16px,3vw,32px) 0",
            borderTop: "1px solid #333",
            paddingTop: "clamp(16px,3vw,32px)",
          }}
        >
          От брифа до деплоя
        </div>

        <div>
          <div className="cover-meta">
            <div className="cover-meta-item">
              <div className="cover-meta-label">Шагов</div>
              <div className="cover-meta-val">7</div>
            </div>
            <div className="cover-meta-item">
              <div className="cover-meta-label">Инструментов</div>
              <div className="cover-meta-val">8</div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section" id="tools">
        <div className="section-eyebrow">01 / инструменты</div>
        <div className="section-title">Что и зачем</div>
        <div className="tools-grid">
          {tools.map((t) => (
            <div key={t.name} className="tool-card">
              <div className="tool-name">{t.name}</div>
              <div className="tool-what">{t.what}</div>
              <div className="tool-how">{t.how}</div>
              <div className={`tool-status ${t.status === "ready" ? "status-ready" : "status-need"}`}>
                {t.statusText}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="section" id="steps">
        <div className="section-eyebrow">02 / процесс</div>
        <div className="section-title">6 шагов</div>
        <div className="steps-list">
          {steps.map((s) => (
            <div key={s.num} className="step-row">
              <div className="step-num">{s.num}</div>
              <div className="step-body">
                <div className="step-badge">{s.badge}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
                <div className="step-tools">
                  {s.tools.map((tool) => (
                    <span key={tool} className="step-tool">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTALL */}
      <section className="section" id="install" style={{ borderBottom: "none" }}>
        <div className="section-eyebrow">03 / с чего начать</div>
        <div className="section-title">Что установить прямо сейчас</div>
        <div className="install-list">
          {installItems.map((item) => (
            <div key={item.name} className="install-row">
              <div className="install-name">{item.name}</div>
              <div className="install-desc">{item.desc}</div>
              <div className="install-status">{item.order}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
