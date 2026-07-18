import type { ReactNode } from "react";

export interface NewspaperShellProps {
  children: ReactNode;
  className?: string;
}

export function NewspaperShell({ children, className }: NewspaperShellProps) {
  const shellClass = ["np-shell", className].filter(Boolean).join(" ");

  return (
    <div className="np-page-wrap">
      <div className={shellClass}>{children}</div>
    </div>
  );
}
