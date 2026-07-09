'use client';

import Link from 'next/link';
import { Container, Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Leida Design System
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'text.secondary' }}>
          Material-UI implementation with Leida tokens
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Theme Colors
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Parchment grounds, clay accent, warm shadows
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: '#f7f7f4',
                    border: '1px solid #ccc',
                    title: 'Parchment',
                  }}
                />
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: '#a8927a',
                    title: 'Clay',
                  }}
                />
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: '#1a1814',
                    title: 'Ink',
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Typography
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Times italic display, DM Sans body, DM Mono labels
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">DM Sans (600)</Typography>
                <Typography variant="caption">DM MONO UPPERCASE</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained">Primary Button</Button>
        <Button variant="outlined">Outlined Button</Button>
        <Button variant="text">Text Button</Button>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button component={Link} href="/marketing" variant="contained" color="secondary">
          Open Marketing Page
        </Button>
        <Button component={Link} href="/client" variant="outlined" color="secondary">
          Open Client Page
        </Button>
      </Box>

      <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Built by a skin therapist, for skin therapists.
        </Typography>
      </Box>
    </Container>
  );
}
