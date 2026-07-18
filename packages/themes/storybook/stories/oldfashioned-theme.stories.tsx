import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge, Button, Card, Favicon } from "@nx/oldfashioned";

const meta = {
  title: "Themes/Oldfashioned Theme",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: {
    theme: "oldfashioned",
  },
  render: () => (
    <main style={{ maxWidth: "900px", margin: "0 auto" }}>
      <section style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Favicon mode="color" size={30} />
          <div>
            <Badge tone="clay">Oldfashioned Theme</Badge>
            <h1 style={{ color: "var(--text-strong)", margin: "0.6rem 0 0.35rem" }}>
              Original NX visual language
            </h1>
            <p style={{ color: "var(--text-body)", margin: 0 }}>
              This preview uses @nx/oldfashioned with data-design-system set by the Storybook toolbar.
            </p>
          </div>
        </div>

        <Card padding="lg" variant="paper">
          <p style={{ marginTop: 0 }}>Token baseline loaded. Components reflect oldfashioned color and type scales.</p>
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
            <Button>Continue</Button>
            <Button variant="ghost">Inspect</Button>
          </div>
        </Card>
      </section>
    </main>
  ),
};
