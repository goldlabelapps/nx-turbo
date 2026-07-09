A hairline range slider with an ink thumb ringed in parchment; label on the left, live serif-italic value on the right. From the cost-calculator section.

```jsx
<RangeSlider label="Clients / week" min={5} max={80} value={30}
  onChange={setN} />
<RangeSlider label="Price / month" min={0} max={200} step={5}
  formatValue={(v) => `£${v}`} />
```

- Controlled via `value` + `onChange`, or uncontrolled.
- `formatValue` renders currency/units in the value slot.
