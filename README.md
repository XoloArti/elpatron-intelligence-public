# ELPATRON Intelligence · Railway PUBLIC DEMO

**Статус:** подготовлено к публикации, **не развёрнуто**. Публичный пакет содержит **только синтетический учебный набор** и не содержит внутренние SHA, приватные findings, receipts или URL к trading API.

## Что запускается

- Node.js HTTP static server без npm зависимостей. `public/index.html` — отдельная публичная демонстрационная сборка из v2.
- `GET /` — демонстрационный интерфейс на вымышленных данных.
- `GET /healthz` — health check (HTTP 200), `GET /version` — SHA **самого сайта** или UNKNOWN. Не равен ELPATRON production SHA.
- Другие пути — 404; методы записи — 405. Сервер не подключается к GitHub/Railway/exchange и ничего не изменяет.
- Content Security Policy запрещает `connect-src`; встроенный JS работает локально и может читать выбранный пользователем JSON в его браузере. Файл не загружается на сервер. Для чувствительных evidence используйте отдельный закрытый контур, не публичный demo-host.

## Локальная проверка (при наличии Node 22+)

```bash
PORT=3000 node server.js
# в отдельном терминале:
curl -i http://localhost:3000/healthz
curl -i http://localhost:3000/
```

## Railway: схема как у investor demo (без вмешательства в него)

1. Создать **отдельный проект** в Railway (например, `elpatron-intelligence-public-demo`) в согласованном workspace. Не добавлять сервис в trading project ELPATRON.
2. Опубликовать **только этот безопасный пакет** в отдельном разрешённом GitHub repo либо выполнить отдельно разрешённую загрузку через Railway CLI (без публикации приватного исходника ELPATRON). Для git-пути настроить source на этот repo и branch; Railway увидит `Dockerfile` и `railway.json`.
3. На новом отдельном сервисе получить Railway-generated domain. Проверить `/healthz`, `/version`, видимость баннера `ПУБЛИЧНАЯ ДЕМОВЕРСИЯ`, отсутствие внутренних данных и отсутствие соединений с production.
4. Не копировать из trading project никакие env vars, Railway secrets, credentials, database urls, volumes, accounts.
5. Сайт публичный: доступен всем по ссылке. Никакой общей БД и автоматического аудита тут **нет**.

**Authorization:** создание GitHub repo, commit/push/PR/main, Railway project/service, домен и deployment — отдельные операции записи и требуют явно сформулированного разрешения. В этом пакете они НЕ выполнялись.

## Как сделать настоящие данные позже

Сначала отдельно согласовать приватный read-only collector / evidence store с изоляцией от ELPATRON. Публичному слою выдавать только агрегированный redacted и provenance-validated отчёт с правами на публикацию. Доказанные REAL показатели не приравнивать к SOURСE/CI/model, а неизвестность оставлять `UNKNOWN`.
