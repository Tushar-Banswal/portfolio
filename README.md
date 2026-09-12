# JSON-driven portfolio

This Express server renders the portfolio with [LiquidJS](https://liquidjs.com/). It reads `portfolio.config.json` on every request, so content updates appear without changing the HTML or restarting the server.

## Run

```bash
npm install
npm start
```

Open `http://localhost:3000`. For auto-restarts while editing server code, use `npm run dev`.

## Control the page with JSON

Edit `portfolio.config.json`. Objects represent page areas and arrays represent repeated cards, links, tags, and skills. The Liquid template is `index.html`.

Each optional component is guarded with a Liquid condition. Set an optional value or complete section to `null` to exclude its markup. Set an array to `[]` to render no items.

```json
{
  "hero": { "availability": null, "socialLinks": null },
  "reviews": null,
  "contact": { "whatsapp": null }
}
```

The template uses familiar syntax such as `{% if contact.whatsapp %}` and `{% for project in work.projects %}`. The JSON top-level keys (`hero`, `work`, `contact`, and so on) are provided directly to Liquid.

`about.statement` supports trusted HTML for the supplied emphasis markup; only use author-controlled text in that field.
