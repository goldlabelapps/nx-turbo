import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge, Button, Card } from "@nx/unix";

const meta = {
  title: "Themes/Unix Theme",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: {
    theme: "unix",
  },
  render: () => (
    <main style={{ maxWidth: "900px", margin: "0 auto" }}>
      <section style={{ display: "grid", gap: "1rem" }}>
        <div>
          <Badge tone="clay">Unix Theme</Badge>
          <h1 style={{ color: "var(--text-on-ink)", margin: "0.6rem 0 0.35rem" }}>
            Agentic terminal shell
          </h1>
          <p style={{ color: "var(--text-on-ink-dim)", margin: 0 }}>
            This preview uses @nx/unix with data-design-system set by the Storybook toolbar.
          </p>
        </div>

        <Card padding="lg" variant="glass">
          <p style={{ marginTop: 0 }}>Ready state: all systems online.</p>
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
            <Button>Start</Button>
            <Button variant="ghost">Inspect</Button>
          </div>
        </Card>
      </section>
    </main>
  ),
};
