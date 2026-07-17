import { Badge, Button, Card, Tag } from "@nx/design-system";
import { readHistory } from "../../lib/agent-history";

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const sessions = await readHistory();

  return (
    <main className="page">
      <section className="shell">
        <div className="section-head">
          <Badge tone="ink">History</Badge>
          <h1>Session timeline</h1>
          <p className="lede">Each run can be reviewed, reused, and promoted into production artifacts.</p>
        </div>

        <div className="route-grid">
          {sessions.length === 0 ? (
            <Card padding="lg" variant="paper">
              <h2>No sessions yet</h2>
              <p>Run a workbench generation or send a chat message to start building timeline history.</p>
              <Button as="a" href="/Agent" size="sm" variant="ghost">
                Open workbench
              </Button>
            </Card>
          ) : null}

          {sessions.map((session) => (
            <Card key={session.id} padding="lg" hoverLift>
              <div className="card-head">
                <h2>{session.title}</h2>
                <Tag variant={session.status === "Published" ? "clay" : "outline"}>{session.status}</Tag>
              </div>
              <p className="eyebrow">{formatTime(session.createdAt)}</p>
              <p>{session.summary}</p>
              <Button as="a" href={session.link} variant="ghost" size="sm">
                Re-open session
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
