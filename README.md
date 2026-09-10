# Портфолио Екатерины Меламуд

Персональный сайт Project & Operations Manager, RU/EN.
Стек: React, TypeScript, Vite, Tailwind CSS, Framer Motion, GradFlow, Radix UI, Lucide.

## Локальная работа

Node.js 24 (как в CI), npm:

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

`build` проверяет TypeScript и собирает сайт в `dist/`; `preview` показывает сборку локально.

## Deploy

[Сайт на GitHub Pages](https://melamudkate-sudo.github.io/portfolio/).
`.github/workflows/deploy.yml` при push в `main` или ручном запуске выполняет
`npm ci`, `npm run build` и публикует `dist/` через GitHub Actions.
Базовый путь `/portfolio/` задан в `vite.config.ts`.
Пути к `public/` в React используют `import.meta.env.BASE_URL`.

Известное ограничение: кнопка резюме ссылается на `public/resume.pdf`, которого пока нет.

## Структура

- `src/components/` — секции, layout, UI и используемые анимации.
- `src/hooks/`, `src/lib/` — язык интерфейса и общие утилиты.
- `src/App.tsx`, `src/main.tsx`, `src/index.css` — приложение, точка входа, стили.
- `public/` — используемые фото, шрифт, favicon и OG-изображение.
- `.github/workflows/` — deploy; корневые конфиги — Vite, TypeScript и Oxlint.
- `AGENTS.md` — постоянные правила; `CONTENT.md` — дополнительные факты для будущей работы с контентом.

`node_modules/`, `dist/` и кэши не хранятся в Git.
