import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge, Card } from "@nx/unix";

function UnixThemeShowcase() {
  const [command, setCommand] = React.useState("");
  const [lastCommand, setLastCommand] = React.useState("");

  return (
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

          <div
            style={{
              marginTop: "1rem",
              border: "1px solid var(--border-hairline)",
              background: "rgba(6, 12, 20, 0.88)",
              color: "var(--text-on-ink)",
              padding: "0.65rem 0.75rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              lineHeight: 1.45,
            }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setLastCommand(command.trim());
                setCommand("");
              }}
              style={{ display: "grid", gap: "0.45rem" }}
            >
              <label htmlFor="unix-prompt" style={{ color: "var(--text-on-ink-dim)" }}>
                Interactive prompt
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span aria-hidden="true" style={{ color: "var(--text-accent)" }}>
                  user@unix:~$
                </span>
                <input
                  id="unix-prompt"
                  value={command}
                  autoFocus
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder="type a command and press Enter"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "var(--text-on-ink)",
                    font: "inherit",
                    caretColor: "var(--text-on-ink)",
                  }}
                />
              </div>
            </form>

            {lastCommand ? (
              <p style={{ margin: "0.5rem 0 0", color: "var(--text-on-ink-dim)" }}>
                last input: {lastCommand}
              </p>
            ) : null}
          </div>
        </Card>
      </section>
    </main>
  );
}

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
  render: () => <UnixThemeShowcase />,
};
