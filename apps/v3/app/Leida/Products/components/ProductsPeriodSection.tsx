'use client';
import * as React from 'react';
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import type { RoutinePeriod } from '../../../types';
import { getProductsForPeriod } from '../lib/constants';
import ProductRoutineCard from './ProductRoutineCard';

export default function ProductsPeriodSection() {
  const [period, setPeriod] = React.useState<RoutinePeriod>('am');
  const products = React.useMemo(() => getProductsForPeriod(period), [period]);

  return (
    <Stack spacing={2.5} className="productsSection">
      <Box className="productsHeaderBlock">
        <Typography variant="overline" className="lookAndFeelOverline">Your products</Typography>
        <Typography variant="h4" sx={{ lineHeight: 1, mt: 1 }}>Morning &amp; evening</Typography>
      </Box>

      <ToggleButtonGroup
        className="productsToggle"
        exclusive
        size="small"
        value={period}
        onChange={(_, value: RoutinePeriod | null) => {
          if (value) {
            setPeriod(value);
          }
        }}
      >
        <ToggleButton value="am">Morning</ToggleButton>
        <ToggleButton value="pm">Evening</ToggleButton>
      </ToggleButtonGroup>

      <Box className="productsCardsGrid">
        {products.map((product, index) => (
          <ProductRoutineCard key={`${period}-${product.id}`} product={product} stepNumber={index + 1} />
        ))}
      </Box>
    </Stack>
  );
}
