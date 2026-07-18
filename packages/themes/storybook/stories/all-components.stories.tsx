import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Favicon,
  Icon,
  Input,
  Logo,
  PriceTier,
  ProductCard,
  RangeSlider,
  SegmentedToggle,
  StatCard,
  Tag,
  TopBar,
} from "@nx/ui";

const meta = {
  title: "00 Overview/All Components",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.82)",
  padding: 16,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export const Catalog: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = React.useState(55);
    const [toggleValue, setToggleValue] = React.useState("morning");

    return (
      <main style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: 20 }}>
        <h2 style={{ margin: "0 0 14px", fontSize: "1.2rem" }}>UI Component Catalog</h2>

        <section style={{ marginBottom: 18 }}>
          <p style={{ margin: 0, opacity: 0.7, fontSize: 13 }}>
            Each card shows one component plus its name for a quick visual scan.
          </p>
        </section>

        <section style={{ ...surfaceStyle, marginBottom: 16 }}>
          <h3 style={sectionTitleStyle}>TopBar</h3>
          <TopBar
            links={[
              { label: "Home", href: "#top" },
              { label: "Components", href: "#components" },
              { label: "Docs", href: "#docs" },
            ]}
            cta="Get Started"
            logoHeight={26}
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Logo</h3>
            <Logo variant="full" tone="ink" height={52} />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Favicon</h3>
            <Favicon size={46} tone="ink" title="NX sparkle mark" />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Icon</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon icon="home" />
              <Icon icon="settings" />
              <Icon icon="dashboard" />
            </div>
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Button</h3>
            <Button>Get Started</Button>
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Input</h3>
            <Input label="Email" hint="We will only use this for account updates." placeholder="you@example.com" />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>RangeSlider</h3>
            <RangeSlider
              label="Treatment budget"
              min={20}
              max={140}
              step={5}
              value={rangeValue}
              onChange={setRangeValue}
              formatValue={(v: number) => `GBP ${v}`}
            />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>SegmentedToggle</h3>
            <SegmentedToggle
              options={[
                { value: "morning", label: "Morning" },
                { value: "evening", label: "Evening" },
              ]}
              value={toggleValue}
              onChange={setToggleValue}
            />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Badge</h3>
            <Badge>Most popular</Badge>
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Tag</h3>
            <Tag variant="frost">New</Tag>
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Accordion</h3>
            <Accordion
              items={[
                {
                  q: "What is included?",
                  a: "Shared components, theme tokens, and starter surfaces.",
                },
              ]}
            />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>Card</h3>
            <Card variant="paper" padding="md">Card content goes here.</Card>
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>ProductCard</h3>
            <ProductCard
              image="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 440'><rect width='480' height='440' fill='%23f2e8de'/><rect x='60' y='56' width='360' height='328' rx='36' fill='%23ff5a1f'/><text x='240' y='232' text-anchor='middle' font-family='Arial' font-size='34' font-weight='700' fill='white'>PRODUCT</text></svg>"
              step="Step 02 · Serum"
              name="Barrier Repair Serum"
              brand="NX"
              price="GBP 38"
              tag="New"
              buyLabel="Buy now"
            />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>PriceTier</h3>
            <PriceTier
              name="Solo"
              price="GBP 29"
              cadence="/mo"
              description="A simple plan for one studio."
              features={[
                "One branded aftercare page",
                "Design system components ready to use",
                "Simple layout primitives",
              ]}
              cta="Start now"
            />
          </article>

          <article style={surfaceStyle}>
            <h3 style={sectionTitleStyle}>StatCard</h3>
            <StatCard figure="3x" source="Internal benchmark">
              Faster onboarding for the new starter app.
            </StatCard>
          </article>
        </section>
      </main>
    );
  },
};
