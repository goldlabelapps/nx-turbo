A frosted pill segmented control (2–3 options); active option fills ink. From the Morning / Evening routine toggle.

```jsx
<SegmentedToggle
  options={[{value:"am",label:"Morning"},{value:"pm",label:"Evening"}]}
  value={tab} onChange={setTab} />
```

- Controlled via `value` + `onChange`, or uncontrolled.
- Each option may carry an `icon`.
