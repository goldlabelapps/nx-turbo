'use client';
import * as React from 'react';
import {
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Wrapper from './Wrapper';

export default function Home() {
  return (
      <Wrapper>
      <Stack spacing={3}>
        <Typography variant="overline" className="lookAndFeelOverline">Welcome</Typography>
        <Typography variant="h2" className="lookAndFeelHeading">Home</Typography>
        <Typography variant="body1" className="lookAndFeelLead">
          Welcome to NX. Use the navigation in the header or footer to explore Theme and Routines.
        </Typography>
      </Stack>
      </Wrapper>
  );
}
