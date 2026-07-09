'use client';
import * as React from 'react';
import {
  Stack,
  Typography,
} from '@mui/material';
import Wrapper from '../Layout/components/Wrapper';
import ClientList from './components/ClientList';

export default function Clients() {
  return (
      <Wrapper>
        <Stack spacing={3}>
          <Typography variant="overline" className="lookAndFeelOverline">Your Clients</Typography>
          <Typography variant="h2" className="lookAndFeelHeading">Clients</Typography>
          <ClientList />
        </Stack>
      </Wrapper>
  );
}
