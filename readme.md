<div align="center">
  <h1>👑 📜 Yield Markup</h1>
  <p>Lightweight Components using Generator Functions</p>
  <a href="https://bundlephobia.com/result?p=yieldmarkup">
    <img src="https://badgen.net/bundlephobia/minzip/yieldmarkup@0.1.0" alt="minified and gzipped size">
    <img src="https://badgen.net/bundlephobia/min/yieldmarkup@0.1.0" alt="minified size">
    <img src="https://badgen.net/bundlephobia/dependency-count/yieldmarkup@0.1.0" alt="zero dependencies">
  </a>
</div>

## Install

```console
npm add yieldmarkup
```

## Examples

### Components

```javascript
import { html, renderToString } from "yieldmarkup";
import { fetchData } from "./yourAPI";

function* NavLink(link) {
  yield html`<li>`;
  yield html`<a href="${link.url}">`;
  yield link.title;
  yield html`</a>`;
  yield html`<li>`;
}

function* Nav(links) {
  yield html`<nav aria-label="Primary">`;
  yield html`<ul>`;

  for (const link of links) {
    yield NavLink(link);
  }

  yield html`</ul>`;
  yield html`</nav>`;
}

function* PrimaryNav() {
  yield Nav([
    { url: '/', title: 'Home' },
    { url: '/pricing', title: 'Pricing' },
    { url: '/features', title: 'Features' },
    { url: '/terms', title: 'Terms & Conditions' },
  ]);
}

function* Page() {
  yield html`<!doctype html>`
  yield html`<html lang=en>`
  yield html`<meta charset=utf-8>`
  yield html`<meta name=viewport content="width=device-width">`
  yield html`<body>`;
  yield PrimaryNav();
  yield html`<main>`;
  
  // Can await any promise
  const data = await fetchData();
  yield html`<pre>`;
  yield JSON.stringify(data);
  yield html`</pre>`;
  
  yield html`</main>`;
;}

// Resulting data waits for promises to resolve
const html = await renderToString([Page()]);
```

### Attributes

```javascript
import { attributes, html } from "yieldmarkup";

function CreatePhotoForm() {
  yield html`<form ${attributes({ method: 'post', action: '/photo' })}>`;
  // …
  yield html`</form>`;
}
```

### Data attributes

```javascript
import { dataset, html } from "yieldmarkup";

function Item({ uuid, title }) {
  yield html`<article ${dataset({ uuid })}>`;
  yield html`<h2>`;
  yield title;
  yield html`</h2>`;
  yield html`</article>`;
}
```

## TODO / Future Ideas

```javascript
// Yield function with name of HTML tag
function Nav(links) {
  yield html`<nav aria-label="Primary">`;

  yield function* ul() {
    for (const link of links) {
      yield NavLink(link);
    }
  };

  yield html`</nav>`;
}

// Yield function with name of landmark
function Page() {
  yield PrimaryNav();

  yield function* main() { // <main>
    yield Heading("Welcome!");
  }

  yield function* contentinfo() { // <footer role=contentinfo>
    yield FooterLinks();
  }
}

// Perhaps allow attributes to be set
function Nav2(links) {
  yield function* nav() {
    yield attributes({ "aria-label": "Primary" });

    yield function* ul() {
      for (const link of links) {
        yield NavLink(link);
      }
    };
  }
}
```
