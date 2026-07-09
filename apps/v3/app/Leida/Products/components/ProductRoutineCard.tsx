'use client';
import * as React from 'react';
import {
  Box,
  Button,
  Chip,
  Collapse,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import type { ProductRoutineCardProps } from '../../../types';

export default function ProductRoutineCard({ product, stepNumber }: ProductRoutineCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Paper
      className="productsCard"
      elevation={0}
      sx={{ p: 2 }}
    >
      <Stack spacing={1.5}>
        <Box
          className="productsCardPhoto"
        >
          <img src={product.imageSrc} alt={product.name} />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="caption" className="productsStepLabel">
            {`Step ${stepNumber} - ${product.category}`}
          </Typography>
          {product.tag ? <Chip size="small" label={product.tag} /> : null}
        </Stack>

        <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {`${product.brand} - ${product.size}`}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {product.price}
          </Typography>
          <Button size="small" variant="outlined" disabled>
            Shop
          </Button>
        </Stack>

        <Button
          size="small"
          variant={isOpen ? 'contained' : 'outlined'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? 'Hide details' : 'Why this'}
        </Button>

        <Collapse in={isOpen}>
          <Stack spacing={1.25} sx={{ pt: 1 }}>
            <Typography variant="caption" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Why it is in your routine
            </Typography>
            <Typography variant="body2">{product.whyInRoutine}</Typography>

            <Typography variant="caption" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              How to use
            </Typography>
            <Typography variant="body2">{product.howToUse}</Typography>

            <Typography variant="caption" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Good to know
            </Typography>
            <Typography variant="body2">{product.note}</Typography>
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}
