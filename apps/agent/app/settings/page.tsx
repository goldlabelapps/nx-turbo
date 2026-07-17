"use client";

import { useState } from "react";
import { Badge, Button, Card, RangeSlider, SegmentedToggle } from "@nx/design-system";

const voiceOptions = [
  { value: "concise", label: "Concise" },
  { value: "balanced", label: "Balanced" },
  { value: "detailed", label: "Detailed" },
];

const safetyOptions = [
  { value: "standard", label: "Standard" },
  { value: "strict", label: "Strict" },
];

export default function SettingsPage() {
  const [voice, setVoice] = useState("balanced");
  const [safety, setSafety] = useState("standard");
  const [length, setLength] = useState(620);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="page">
      <section className="shell settings-layout">
        <div className="section-head">
          <Badge tone="ink">Settings</Badge>
          <h1>Runtime preferences</h1>
          <p className="lede">Configure response behavior, safety posture, and output length defaults.</p>
        </div>

        <div className="card-stack">
          <Card padding="lg" variant="glass">
          <div>
            <h2>Voice</h2>
            <SegmentedToggle options={voiceOptions} value={voice} onChange={(value) => setVoice(String(value))} />
          </div>

          <div>
            <h2>Safety</h2>
            <SegmentedToggle options={safetyOptions} value={safety} onChange={(value) => setSafety(String(value))} />
          </div>

          <RangeSlider
            label="Max response length"
            min={150}
            max={1200}
            step={10}
            value={length}
            onChange={setLength}
            formatValue={(value) => `${value} tokens`}
          />

          <div className="actions">
            <Button onClick={save}>Save settings</Button>
            {saved ? <span className="save-note">Saved</span> : null}
          </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
