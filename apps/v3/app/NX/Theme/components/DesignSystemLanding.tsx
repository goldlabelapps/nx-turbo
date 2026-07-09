'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { Eyebrow } from '@nx/design-system/components/brand/Eyebrow';
import { Logo } from '@nx/design-system/components/brand/Logo';
import { Button } from '@nx/design-system/components/forms/Button';
import { Input } from '@nx/design-system/components/forms/Input';
import { Badge } from '@nx/design-system/components/feedback/Badge';
import { Tag } from '@nx/design-system/components/feedback/Tag';
import { Accordion } from '@nx/design-system/components/feedback/Accordion';
import { Card } from '@nx/design-system/components/surfaces/Card';
import { TopBar } from '@nx/design-system/components/navigation/TopBar';

export default function DesignSystemLanding() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <TopBar
        links={[
          { label: 'How it works', href: '#how-it-works' },
          { label: 'Preview', href: '#preview' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta="Join waitlist"
      />

      <Box
        sx={{
          maxWidth: '1080px',
          mx: 'auto',
          px: { xs: 2, md: 3 },
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 },
          display: 'grid',
          gap: { xs: 2.5, md: 3.5 },
        }}
      >
        <Card variant="glass" padding="lg">
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Eyebrow>Theme preview</Eyebrow>
            <Logo height={56} />
            <Box
              component="h1"
              sx={{
                m: 0,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 4.8vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--nx-ink)',
              }}
            >
              Themed design-system landing preview
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Badge tone="ink">Live app skin</Badge>
              <Tag variant="frost">Components in-context</Tag>
              <Tag variant="outline">Temporary route override</Tag>
            </Box>
            <Box
              component="p"
              sx={{
                m: 0,
                maxWidth: '66ch',
                color: 'var(--nx-body)',
              }}
            >
              This page is intentionally built with design-system components so you can quickly assess real
              runtime appearance for core UI controls and layout surfaces.
            </Box>
          </Box>
        </Card>

        <Box
          id="preview"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Card variant="paper" padding="md">
            <Box sx={{ display: 'grid', gap: 1.25 }}>
              <Eyebrow tone="muted">Inputs</Eyebrow>
              <Input
                label="Client name"
                hint="Name field spacing and text style"
              />
              <Input
                label="Client email"
                hint="Email field treatment"
              />
              <Input
                label="Phone"
                hint="Shows helper text spacing and tone"
              />
            </Box>
          </Card>

          <Card variant="tile" padding="md" hoverLift>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Eyebrow tone="muted">Actions</Eyebrow>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                <Button variant="primary">Primary button</Button>
                <Button variant="ghost">Ghost button</Button>
                <Button variant="quiet">Quiet button</Button>
              </Box>
              <Button variant="primary" block>
                Full-width call to action
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Badge tone="clay">Default state</Badge>
                <Tag variant="clay">Therapist ready</Tag>
              </Box>
            </Box>
          </Card>
        </Box>

        <Box id="how-it-works">
          <Card variant="paper" padding="md">
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Eyebrow>How it looks in flow</Eyebrow>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 1.5 }}>
                <Card variant="tile" padding="sm">
                  <strong>1. Capture</strong>
                  <p style={{ margin: '8px 0 0' }}>Collect treatment notes and skin goals.</p>
                </Card>
                <Card variant="tile" padding="sm">
                  <strong>2. Personalise</strong>
                  <p style={{ margin: '8px 0 0' }}>Generate routine content with NX voice.</p>
                </Card>
                <Card variant="tile" padding="sm">
                  <strong>3. Share</strong>
                  <p style={{ margin: '8px 0 0' }}>Deliver a living care page in one tap.</p>
                </Card>
              </Box>
            </Box>
          </Card>
        </Box>

        <Box id="faq">
          <Card variant="paper" padding="md">
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Eyebrow>FAQ</Eyebrow>
              <Accordion
                items={[
                  {
                    q: 'Are these the actual design-system components?',
                    a: 'Yes. This preview imports components directly from the design-system package source.',
                  },
                  {
                    q: 'Why this page?',
                    a: 'It gives a single place to evaluate typography, spacing, forms, and action styling under the active app theme.',
                  },
                  {
                    q: 'Can we keep this temporary?',
                    a: 'Yes. NX is currently hard-overridden to this route and can be switched back easily.',
                  },
                ]}
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
