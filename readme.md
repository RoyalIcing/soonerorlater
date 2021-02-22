<div align="center">
  <h1>💬 📅 Sooner or Later</h1>
  <p>Parse natural language dates</p>
  <a href="https://bundlephobia.com/result?p=soonerorlater">
    <img src="https://badgen.net/bundlephobia/minzip/soonerorlater@0.1.0" alt="minified and gzipped size">
    <img src="https://badgen.net/bundlephobia/min/soonerorlater@0.1.0" alt="minified size">
    <img src="https://badgen.net/bundlephobia/dependency-count/soonerorlater@0.1.0" alt="zero dependencies">
  </a>
</div>

## Install

```console
npm add soonerorlater
```

## Examples

```javascript
import { parse } from "soonerorlater";

parse('Every Wednesday');
/*
{
  repeats: 'weekly',
  weekdays: new Set(['wednesday'])
}
*/

parse('Mondays and Thursdays at 9:30am to 10:30am');
/*
{
  repeats: 'weekly',
  weekdays: new Set(['monday', 'thursday']),
  startTime: { hours: 9, minutes: 30 },
  endTime: { hours: 10, minutes: 30 }
}
*/
```

## Notes

- Uses the library [parcook](https://github.com/RoyalIcing/parcook) for parsing.
- TODO: support standard representations as result
