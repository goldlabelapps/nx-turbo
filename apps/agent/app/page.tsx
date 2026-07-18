import { Badge, Card } from "@nx/unix";

export default function Home() {
  return (
    <main className="page">
      <section className="shell">
        <div className="section-head">
          <Badge tone="clay">NX Agent</Badge>
          <h1>Type request. Get response.</h1>
          <p className="lede">Start with one prompt.</p>
        </div>

        <div style={{ width: "min(760px, 100%)" }}>
          <Card padding="lg" variant="glass">
            <p className="lede">System online. This build currently runs in focused single-page mode.</p>
          </Card>
        </div>
      </section>
    </main>
  );
}