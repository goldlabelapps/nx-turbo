import { Button, Card, Eyebrow } from "@nx/design-system";

export default function NotFound() {
  return (
    <main className="shell shell--centered">
      <div style={{ maxWidth: "620px", width: "100%" }}>
        <Card padding="lg">
          <Eyebrow tone="muted">404</Eyebrow>
          <h1>That page is not here.</h1>
          <p className="lede">The starter app is set up, but the route you asked for does not exist yet.</p>
          <Button as="a" href="/">
            Back home
          </Button>
        </Card>
      </div>
    </main>
  );
}