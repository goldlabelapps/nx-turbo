import { Badge, Button, Card } from "@nx/design-system";

type CatchAllPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;

  return (
    <main className="page">
      <section className="shell shell--centered">
        <div style={{ width: "min(760px, 100%)" }}>
          <Card padding="lg" variant="glass">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <Badge tone="ink">Simple Mode</Badge>
              <h1>Type request. Get response.</h1>
              <p className="lede">Current path: {path}</p>
            </div>

            <div className="actions">
              <Button as="a" href="/chat">
                Open chat
              </Button>
              <Button as="a" href="/" variant="ghost">
                Home
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
