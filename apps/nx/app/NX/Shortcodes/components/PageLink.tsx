'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@nx/oldfashioned';

function normalizeRoutePath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withoutOrigin = trimmed.replace(/^https?:\/\/[^/]+/i, '');
  const [pathOnly] = withoutOrigin.split(/[?#]/);
  const normalized = pathOnly || '/';
  if (normalized === '/') return '/';
  return normalized.replace(/\/+$/, '');
}

export default function PageLink({
  url = null,
  title = null,
  description = null
}: {
  url?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  const pathname = usePathname();
  if (!url) return null;

  const isExternal = /^https?:\/\//i.test(url);
  const normalizedCurrentPath = normalizeRoutePath(pathname || '/');
  const normalizedTargetPath = normalizeRoutePath(url);
  if (!isExternal && normalizedTargetPath === normalizedCurrentPath) {
    return null;
  }

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
