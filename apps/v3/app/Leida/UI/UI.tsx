'use client';
import * as React from 'react';
import {
  Stack,
  Typography,
} from '@mui/material';

export default function UI() {
  return (
      <Stack spacing={3}>
        <Typography variant="overline" className="lookAndFeelOverline">User Interface</Typography>
        <Typography variant="h2" className="lookAndFeelHeading">UI</Typography>
        <Typography variant="body1" className="lookAndFeelLead">
          UI tools and components appear here.
        </Typography>
      </Stack>
  );
}
