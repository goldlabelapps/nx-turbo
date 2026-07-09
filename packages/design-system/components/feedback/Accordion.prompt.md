A hairline-divided FAQ / disclosure list with a rotating clay chevron.

```jsx
<Accordion items={[
  { q: "Is it really faster than WhatsApp?", a: "Yes, one tap sends a living page." },
  { q: "Do my clients need an app?", a: "No. It saves to their home screen like one." },
]} />
<Accordion summaryStyle="mono" allowMultiple items={faqs} />
```

- `summaryStyle`: `"serif"` (italic, default) · `"mono"` (uppercase)
- `allowMultiple` keeps several panels open.
