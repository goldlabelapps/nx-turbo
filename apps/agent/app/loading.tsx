import { Card } from "@nx/design-system";

export default function Loading() {
  return (
    <main className="page">
      <section className="shell shell--centered loading-layout" aria-busy="true" aria-live="polite">
        <Card padding="lg" variant="glass">
          <div className="skeleton skeleton--eyebrow" />
          <div className="skeleton skeleton--headline" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line short" />
        </Card>
      </section>
    </main>
  );
}
