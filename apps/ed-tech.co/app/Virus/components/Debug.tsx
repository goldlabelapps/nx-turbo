"use client";
import * as React from "react";
import { useVirus } from "../hooks/useVirus";

export default function Debug() {
  const virus = useVirus();
  return (
      <pre>virus: {JSON.stringify(virus, null, 2)}</pre>
  );
}
