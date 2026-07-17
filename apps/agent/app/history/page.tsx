import { Badge, Button, Card, Tag } from "@nx/design-system";

const sessions = [
  {
    title: "Homepage narrative rewrite",
    time: "2026-07-17 09:20",
    status: "Published",
    summary: "Reframed hero copy and action hierarchy for better clarity.",
  },
  {
    title: "Workbench prompt format",
    time: "2026-07-16 16:48",
    status: "Draft",
    summary: "Defined structure for goal, context, and output constraints.",
  },
  {
    title: "Loading and error hardening",
    time: "2026-07-15 14:02",
    status: "Validated",
    summary: "Added resilient fallback states for route transitions and render failures.",
  },
];

export default function HistoryPage() {
  return (
    <main className="page">
      <section className="shell">
        <div className="section-head">
          <Badge tone="ink">History</Badge>
          <h1>Session timeline</h1>
          <p className="lede">Each run can be reviewed, reused, and promoted into production artifacts.</p>
        </div>

        <div className="route-grid">
          {sessions.map((session) => (
            <Card key={session.title} padding="lg" hoverLift>
              <div className="card-head">
                <h2>{session.title}</h2>
                <Tag variant={session.status === "Published" ? "clay" : "outline"}>{session.status}</Tag>
              </div>
              <p className="eyebrow">{session.time}</p>
              <p>{session.summary}</p>
              <Button as="a" href="/Agent" variant="ghost" size="sm">
                Re-open in workbench
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
