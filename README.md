# Портфолио Екатерины Меламуд

Персональное портфолио Project & Operations, RU/EN.
Стек: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide.

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

[Сайт — aggesiya.ru](https://aggesiya.ru/). Хостинг — GitHub Pages.
`.github/workflows/deploy.yml` при push в `main` или ручном запуске выполняет
`npm ci`, `npm run build` и публикует `dist/` через GitHub Actions.
Базовый путь `/` задан в `vite.config.ts`: сайт работает из корня собственного домена.
Домен указан в `public/CNAME`; canonical, Open Graph и sitemap используют `https://aggesiya.ru/`.
При публикации через Actions привязка домена также должна быть установлена в Settings → Pages репозитория.
Пути к `public/` в React используют `import.meta.env.BASE_URL`.

## Резюме и материалы проектов

Добавьте утверждённый PDF в `public/resume.pdf` и перезапустите dev-сервер или выполните новую сборку. Наличие файла проверяется в Vite: ссылка на первом экране откроет PDF в новой вкладке, а кнопка в блоке резюме скачает файл. Пока файла нет, первый экран ведёт к блоку резюме с честным статусом, а кнопка «Скачать резюме» неактивна. После добавления файла и сборки она скачивает `/resume.pdf` с именем `Ekaterina-Melamud-Resume.pdf`. Подпись актуальности рассчитана на резюме за октябрь 2026; при замене обновите её в `src/components/sections/next.tsx`.

Четыре основных кейса, пять компактных проектов и тексты RU/EN: `src/components/sections/cases/data.ts`. У каждого основного кейса одна статичная схема в `src/components/sections/cases/evidence.tsx`; раскрываются только подробности роли. Графика обозначена как реконструкция и использует обезличенные условные данные. Показатели предоставлены Екатериной; эффект модели видеопроизводства явно указан как потенциальный. Стили блока изолированы в `cases/cases.css` и `cases/evidence.css`.

## Структура

- `src/components/` — секции, layout, UI и используемые анимации.
- `src/hooks/`, `src/lib/` — язык интерфейса и общие утилиты.
- `src/App.tsx`, `src/main.tsx`, `src/index.css` — приложение, точка входа, стили.
- `public/` — используемые фото, favicon и OG-изображение.
- `.github/workflows/` — deploy; корневые конфиги — Vite, TypeScript и Oxlint.
- `AGENTS.md` — постоянные правила; `CONTENT.md` — дополнительные факты для будущей работы с контентом.

`node_modules/`, `dist/` и кэши не хранятся в Git.
