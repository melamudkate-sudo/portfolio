# Portfolio — Екатерина

Персональный сайт-портфолио Екатерины, Project & Operations Manager.

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу, который выведет Vite (обычно `http://localhost:5173`).

## Команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | Локальная разработка |
| `npm run lint` | Проверка кода |
| `npm run build` | Проверка TypeScript и production-сборка |
| `npm run preview` | Просмотр готовой сборки |

## GitHub Pages

Сайт: https://melamudkate-sudo.github.io/portfolio/

В Settings → Pages → Build and deployment выберите Source: **GitHub Actions**.
Workflow `.github/workflows/deploy.yml` при каждом push в `main` проверяет TypeScript,
собирает приложение и публикует только содержимое `dist/`.
Публикация исходников из корня ветки не подходит для Vite.

Базовый путь `/portfolio/` задан в `vite.config.ts`. Для ресурсов из `public/`
в React используйте `import.meta.env.BASE_URL`; пути в CSS и HTML обрабатывает Vite.
Для кнопки скачивания резюме нужно добавить файл `public/resume.pdf`.

## Структура

- `src/` — React-компоненты, стили, хуки и утилиты.
- `public/` — статические материалы сайта: фото, шрифты, изображения для соцсетей.
- `docs/` — утверждённая концепция, позиционирование, UX и фактическая база для текстов.
- `PROJECT_CONTEXT.md` — краткий рабочий контекст и правила внесения изменений.

Перед изменением дизайна или текстов начните с [docs/START_HERE.md](docs/START_HERE.md). Это основной навигатор по документации и зафиксированным решениям проекта.
