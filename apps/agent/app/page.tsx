import { Badge, Button, Card } from "@nx/design-system";

export default function Home() {
  return (
    <main className="page">
      <section className="shell">
        <div className="section-head">
          <Badge tone="clay">Agent Frontend</Badge>
          <h1>Type request. Get response.</h1>
          <p className="lede">Start with one prompt.</p>
        </div>

        <div style={{ width: "min(760px, 100%)" }}>
          <Card padding="lg" variant="glass">
            <div className="actions" style={{ marginTop: 0 }}>
              <Button as="a" href="/chat">
                Open chat
              </Button>
              <Button as="a" href="/history" variant="ghost">
                History
              </Button>
              <Button as="a" href="/settings" variant="ghost">
                Settings
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}