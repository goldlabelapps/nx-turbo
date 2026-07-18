"use client";

import { Badge, Button, Card } from "@nx/unix";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="page">
      <section className="shell shell--centered">
        <div style={{ width: "min(720px, 100%)" }}>
          <Card padding="lg" variant="paper">
            <Badge tone="clay">Error</Badge>
            <h1>Something failed while rendering this view.</h1>
            <p className="lede">
              The app recovered safely. You can retry immediately or go to another route.
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--nx-muted)" }}>
              {error.digest ? `Reference: ${error.digest}` : "No digest was provided for this error."}
            </p>
            <div className="actions">
              <Button onClick={reset}>Try again</Button>
              <Button as="a" href="/" variant="ghost">
                Back home
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
