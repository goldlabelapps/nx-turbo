'use client';
import React from 'react';
import { Button } from '@nx/design-system';

export default function PageLink({
  url = null,
  title = null,
  description = null
}: {
  url?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  if (!url) return null;

  const isExternal = url.startsWith('http');
  const label = title || description || url;

  return (
    <Button
      as="a"
      variant="quiet"
      block={true}
      href={url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        justifyContent: 'flex-start',
        padding: '12px 14px',
        borderColor: 'transparent',
        background: 'rgba(255,255,255,0.46)',
        boxShadow: 'none',
      }}
    >
      {label}
    </Button>
  );
}
