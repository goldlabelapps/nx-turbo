import React from "react";
import { Icon, ICON_NAMES } from "./Icon";

export default {
  title: "00 Overview/All Icons",
  component: Icon,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    icon: "home",
    color: "inherit",
  },
  argTypes: {
    icon: {
      control: "select",
      options: ICON_NAMES,
    },
    color: {
      control: "select",
      options: ["inherit", "primary", "secondary", "success", "error", "warning", "info", "action", "disabled"],
    },
  },
};

export const Playground = {};

export const IconGallery = {
  render: () => (
    <section style={{ width: "100%", maxWidth: 1280, padding: "20px 24px" }}>
      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "1.2rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        Icon Component Catalog
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        {ICON_NAMES.map((name) => (
          <article
            key={name}
            style={{
              border: "1px solid rgba(0,0,0,0.14)",
              borderRadius: 10,
              minHeight: 74,
              padding: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.78)",
            }}
          >
            <Icon icon={name} />
            <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.25 }}>{name}</span>
          </article>
        ))}
      </div>
    </section>
  ),
};
