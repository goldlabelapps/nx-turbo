import React from "react";
import { SegmentedToggle } from "./SegmentedToggle";

const options = [
  { value: "morning", label: "Morning" },
  { value: "evening", label: "Evening" },
];

export default {
  title: "Forms/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  args: {
    options,
  },
};

export const Default = {
  render: (args) => {
    const [value, setValue] = React.useState(options[0].value);
    return <SegmentedToggle {...args} value={value} onChange={setValue} />;
  },
};

export const WithIcons = {
  render: (args) => {
    const [value, setValue] = React.useState(options[0].value);
    return (
      <SegmentedToggle
        {...args}
        value={value}
        onChange={setValue}
        options={[
          { value: "morning", label: "Morning", icon: "☀" },
          { value: "evening", label: "Evening", icon: "☾" },
        ]}
      />
    );
  },
};
