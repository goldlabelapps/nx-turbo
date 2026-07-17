import { Badge, Button, Card, Eyebrow, Logo, StarMark } from "@nx/design-system";

const highlights = [
  {
    title: "Design system first",
    copy: "Typography, buttons, cards, and the temporary logo placeholders are imported directly into the app.",
  },
  {
    title: "Plain Next.js",
    copy: "No product logic yet. This is a clean starter with a few deliberate sections and room to grow.",
  },
  {
    title: "Easy to extend",
    copy: "Add pages, layouts, and data flows without untangling old app structure first.",
  },
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-mark">
          <Logo height={56} />
          <StarMark size={28} tone="current" />
        </div>
        <Eyebrow>Starter app</Eyebrow>
        <h1>A clean Next.js base with the design system already in place.</h1>
        <p className="lede">
          This app is intentionally lightweight: a polished shell, a few pieces of content,
          and shared UI primitives ready to use on the first commit.
        </p>
        <div className="actions">
          <Button as="a" href="#content">
            Explore the starter
          </Button>
          <Button as="a" href="/" variant="ghost">
            Reset the layout
          </Button>
        </div>
      </section>

      <section className="content" id="content">
        <div className="content-head">
          <Badge tone="clay">Ready now</Badge>
          <h2>Built to be the starting point, not a placeholder app.</h2>
        </div>

        <div className="grid">
          {highlights.map((item) => (
            <Card key={item.title} padding="lg" hoverLift>
              <Eyebrow tone="muted">{item.title}</Eyebrow>
              <p>{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}