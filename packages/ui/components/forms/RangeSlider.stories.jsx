import React from "react";
import { RangeSlider } from "./RangeSlider";

export default {
  title: "Forms/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  args: {
    label: "Treatment budget",
    min: 20,
    max: 140,
    step: 5,
  },
};

export const Default = {
  render: (args) => {
    const [value, setValue] = React.useState(65);
    return <RangeSlider {...args} value={value} onChange={setValue} formatValue={(v) => `£${v}`} />;
  },
};

export const Uncontrolled = {
  args: {
    value: undefined,
  },
  render: (args) => <RangeSlider {...args} formatValue={(v) => `£${v}`} />,
};
