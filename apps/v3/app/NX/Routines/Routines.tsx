'use client';
import * as React from 'react';
import {
  Stack,
  Typography,
} from '@mui/material';
import Wrapper from '../Layout/components/Wrapper';
import RoutineFlow from './components/RoutineFlow';

export default function Routines() {
  return (
      <Wrapper>
      <Stack spacing={3}>
        <Typography variant="overline" className="lookAndFeelOverline">Your Routines</Typography>
        <Typography variant="h2" className="lookAndFeelHeading">Routines</Typography>
        <Typography variant="body1" className="lookAndFeelLead">
          Build routines in a guided flow designed for fast, consistent practitioner setup.
        </Typography>
        <RoutineFlow />
      </Stack>
      </Wrapper>
  );
}
