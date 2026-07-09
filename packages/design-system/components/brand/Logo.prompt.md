Leida's editorial italic wordmark (sparkle over the i), or the sparkle mark alone. Use in nav bars, app headers, footers, and splash screens.

```jsx
<Logo height={44} />                       {/* full wordmark, ink */}
<Logo variant="mark" height={32} tone="clay" />
<Logo tone="offwhite" height={40} />       {/* on ink grounds */}
```

- `variant`: `"full"` (default) or `"mark"` (sparkle only)
- `tone`: `"ink"` · `"dusty"` · `"offwhite"` · `"current"` (inherits `color`)
- Size via `height` (px); width scales automatically.
