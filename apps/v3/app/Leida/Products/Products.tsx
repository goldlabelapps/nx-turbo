'use client';
import * as React from 'react';
import {
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Wrapper from '../Layout/components/Wrapper';
import ProductsPeriodSection from './components/ProductsPeriodSection';
import ProductsSideBySide from './components/ProductsSideBySide';

export default function Products() {
  return (
      <Wrapper>
      <Stack spacing={3}>
        <Typography variant="overline" className="lookAndFeelOverline">Your Products</Typography>
        <Typography variant="h2" className="lookAndFeelHeading">Products</Typography>
        <Typography variant="body1" className="lookAndFeelLead">
          Recreated from the living routine demo: your products toggle and the side-by-side AM/PM glance view.
        </Typography>

        <ProductsPeriodSection />

        <Divider />

        <ProductsSideBySide />
      </Stack>
      </Wrapper>
  );
}
