# QCB · MultiCharts Strategy Development

An English-language site for custom MultiCharts strategy development. It covers services, deliverables, the project process, and email inquiries, with a PowerLanguage moving average crossover demo.

## Preview locally

Run this command from the repository root.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` or open `index.html` directly in a browser.

## Maintenance

- `index.html` contains the page copy, contact email, and PowerLanguage example. When changing the email address, update both the visible address and the `mailto:` link.
- `style.css` controls the page styles and responsive layout.
- `strategy-demo.js` computes 5- and 13-period moving averages from a fixed series of simulated prices and plots the entry and exit signals. If the periods change, update the corresponding labels, parameters, and example code in `index.html`.

## GitHub Pages

The site deploys from the root of `main` via **Settings → Pages → Deploy from a branch**. Push updates to `main` to publish a new version. The public site is available at the [QCB website](https://vincentcyf.github.io/QCB/).
