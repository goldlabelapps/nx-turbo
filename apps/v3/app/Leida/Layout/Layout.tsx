'use client';
import * as React from 'react';
import {
  Stack,
  Typography,
} from '@mui/material';

export default function Layout() {
  return (
      <Stack spacing={3}>
        <Typography variant="overline" className="lookAndFeelOverline">Layout</Typography>
        <Typography variant="h2" className="lookAndFeelHeading">Layout</Typography>
        <Typography variant="body1" className="lookAndFeelLead">
          Layout tools and components appear here.
        </Typography>
      </Stack>
  );
}
