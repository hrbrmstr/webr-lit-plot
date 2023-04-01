---
{
  "title": "🧪 Vite + WebR + Pyodide + Lit",
   "description": "Better builds + lightweight components.",
  "og" : {
    "site_name": "WebR Exeriments",
    "url": "https://rud.is/w/vite-webr-lit",
    "description": "Better builds + lightweight components.",
    "image": {
      "url": "https://rud.is/w/vite-webr-lit/preview.png",
      "height": "836",
      "width": "1014",
      "alt": "example"
    }
  },
  "twitter": {
    "site": "@hrbrmstr",
    "domain": "rud.is"
  },
	"extra_header_bits": [
		"<link rel='apple-touch-icon' sizes='180x180' href='./favicon/apple-touch-icon.png'>",
		"<link rel='icon' type='image/png' sizes='32x32' href='./favicon/favicon-32x32.png'>",
		"<link rel='icon' type='image/png' sizes='16x16' href='./favicon/favicon-16x16.png'>",
		"<link rel='manifest' href='./favicon/site.webmanifest'>",
		"<link href='./src/index.css' rel='stylesheet'>",		
		"<link href='./src/components.css' rel='stylesheet'>",		
		"<script type='module' src='./src/main.js'></script>"
	],
	"extra_body_bits": [
		"<!-- extra body bits -->"
	]
}
---
# 🧪 🕸️ Vite + WebR + Pyodide + <img src="./src/assets/lit.svg" width="32" height="32" style="padding-left:4px;"/> Lit

<status-message id="webr-status" text="WebR Loading…"></status-message>

<button-with-raw-results id="r-button" label="Get some random numbers from" disabled></button-with-raw-results>

## hrbrmstr, you need help

Yes. Yes, I do.

There's nothing ZOMGOSH special in this latest experiment except that it is a fully working [Vite](https://vitejs.dev/) + WebR + [Lit](https://lit.dev/) Vanilla JS web app with _reusable_ components that provides a button and output area.

The source uses this highly reusable component in it:

```html
<button-with-raw-results
  id = "r-button" 
  label = "Get some random numbers from"
  disabled
></button-with-raw-results>
```

We target it and wire up our `onClick` handler to it:

```js
const rButton = document.querySelector('#r-button');
rButton.onClick = async () => {
  rButton.results = JSON.stringify(await R`sample(100, 5)`) // *
};
rButton.disabled = false
```

_(*Notice the use of the `R` template tag function.)_

That idiom lets us de-couple the "business logic" from the presentation layer.

You can look in `button-with-raw-results.js` for the full code, but one other addition which makes this component reusable is that we're using CSS variables for styling (not fully b/c I'm tired, but enough to get the idea):

```js
:host div.results-output {
  color: var(--results-color);
  font-family: var(--results-font-family);
}
```

I added a `components.css` to set those two variables for this project:

```css
button-with-raw-results {
  --results-font-family: 'Comic Code Ligatures', monospace;
  --results-color: rgba(var(--functional-green), 1);
}
```

## Vite Config

The `vite.config.js` is worth talking about. Explanations are in-line:

```js
import { defineConfig } from 'vite'

// this handles our ES6 modules using "top-level 'await'"
// for us without us having to code-up anything

import topLevelAwait from "vite-plugin-top-level-await";

// Ref:https://vitejs.dev/config/

export default defineConfig({
  base: '/w/vite-webr-lit/', // change this for your production deployment; vite will assum `/` if not
  build: {
    lib: {
      entry: 'index.html', // doing this has Vite slurp up all resource references in it
      formats: ['es'],
    },
    rollupOptions: { // we need lit on the server; this section is in here by default and not commented
      // external: /^lit/,
    },
  },
  plugins: [
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: i => `__tla_${i}`
    })
  ],
  server: {
    headers: { // for serving locally
      "Cache-Control": "no-cache; max-age=1",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "cross-origin",
    }
  }
})
```

The `justfile` has also been updated, accordingly.

If you use VS Code or some other environment that groks "Vite", it'll start a dev serve for you on load and automatically track file changes and reload on-the-fly.

You can use `just build` to make the `dist/` directory, then put that anywhere you like.

Oh, and the Pyodide support is in the sources on GH. Just uncomment out the obvious bits and you'll have that, too.

Source is on [GitHub](https://github.com/hrbrmstr/vite-webr-lit)