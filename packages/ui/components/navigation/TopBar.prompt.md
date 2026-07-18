The sticky, frosted marketing top bar, NX logo, mono-caps nav links, primary CTA. Sits on translucent parchment so page texture shows through.

```jsx
<TopBar
  links={[
    { label: "How it works", href: "#how" },
    { label: "The cost", href: "#calc" },
    { label: "Pricing", href: "#join" },
  ]}
  cta="Become a member"
/>
```
Make it stick with `style={{ position: "sticky", top: 0, zIndex: 50 }}`.
