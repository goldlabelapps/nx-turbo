import { Button, Card } from "@nx/unix";

export default function NotFound() {
  return (
    <main className="page">
      <section className="shell shell--centered">
        <div style={{ maxWidth: "720px", width: "100%" }}>
        <Card padding="lg">
            <div className="eyebrow" style={{ color: "var(--nx-muted)" }}>404</div>
            <h1>That route does not exist.</h1>
            <p className="lede">Use the core routes below to get back to the active frontend flow.</p>
            <div className="actions">
              <Button as="a" href="/">
                Home
              </Button>
              <Button as="a" href="/Agent" variant="ghost">
                Workbench
              </Button>
              <Button as="a" href="/chat" variant="ghost">
                Chat
              </Button>
            </div>
        </Card>
        </div>
      </section>
    </main>
  );
}