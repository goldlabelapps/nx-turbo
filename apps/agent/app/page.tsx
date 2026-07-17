import { Badge, Button, Card, StatCard } from "@nx/design-system";

const routes = [
  {
    title: "Agent Workbench",
    href: "/Agent",
    copy: "Build task intent, tune behavior controls, and generate structured output drafts.",
  },
  {
    title: "Chat",
    href: "/chat",
    copy: "Run fast conversational prompts with starter chips and a live message stream.",
  },
  {
    title: "History",
    href: "/history",
    copy: "Review previous sessions and reopen outcomes back in the workbench.",
  },
  {
    title: "Settings",
    href: "/settings",
    copy: "Adjust safety posture, style voice, and default response budgets.",
  },
];

export default function Home() {
  return (
    <main className="page page-home">
      <section className="shell">
        <div className="hero hero-home">
          <Badge tone="clay">Agent Frontend</Badge>
          <h1>Operational routes, production guardrails, and a visual system with intent.</h1>
          <p className="lede">
            This app is now a complete frontend surface: route navigation, a real Agent workbench,
            dedicated chat and history views, runtime settings, loading/error resilience, and analytics-ready hooks.
          </p>
          <div className="actions">
            <Button as="a" href="/Agent">
              Open workbench
            </Button>
            <Button as="a" href="/chat" variant="ghost">
              Start chat
            </Button>
          </div>
        </div>

        <div className="route-grid" id="content">
          {routes.map((item) => (
            <Card key={item.title} padding="lg" hoverLift>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <Button as="a" href={item.href} size="sm" variant="quiet">
                Go to route
              </Button>
            </Card>
          ))}
        </div>

        <div className="stats-grid">
          <StatCard figure="4 routes" source="Navigation">
            Home, chat, history, and settings are now wired under a shared shell.
          </StatCard>
          <StatCard figure="3 safeguards" source="Reliability">
            Global loading state, error boundary UI, and not-found fallbacks are active.
          </StatCard>
        </div>
      </section>
    </main>
  );
}