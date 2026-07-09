'use client';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { PRODUCTS_BY_ID, ROUTINE_STAGES } from '../lib/constants';

function Cell({ productId, stage }: { productId: string | null; stage: string }) {
  if (!productId) {
    return (
      <Paper elevation={0} className="productsStageCell productsStageCellEmpty" sx={{ p: 1.5 }}>
        <Typography variant="caption" color="text.secondary">No step</Typography>
      </Paper>
    );
  }

  const product = PRODUCTS_BY_ID[productId];

  return (
    <Paper elevation={0} className="productsStageCell" sx={{ p: 1.5 }}>
      <Box className="productsStageImageWrap">
        <img src={product?.imageSrc} alt={product?.name} className="productsStageImage" />
      </Box>
      <Typography variant="caption" className="productsStageLabel">{stage}</Typography>
      <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600 }}>{product?.name}</Typography>
      <Typography variant="caption" color="text.secondary">{product?.brand}</Typography>
    </Paper>
  );
}

export default function ProductsSideBySide() {
  return (
    <Stack spacing={2} className="productsSideBySideSection">
      <Box>
        <Typography variant="overline" className="lookAndFeelOverline">At a glance</Typography>
        <Typography variant="h5" sx={{ lineHeight: 1.1, mt: 1 }}>Morning &amp; evening, side by side</Typography>
      </Box>

      <Stack spacing={1.5}>
        <Box className="productsStageHead">
          <Typography variant="caption" sx={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>AM</Typography>
          <Typography variant="caption" sx={{ letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center' }}>Step</Typography>
          <Typography variant="caption" sx={{ letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'right' }}>PM</Typography>
        </Box>

        {ROUTINE_STAGES.map((row, index) => (
          <Box key={row.stage} className="productsStageRow">
            <Cell productId={row.am} stage={row.stage} />
            <Box className="productsStageCount">
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{index + 1}</Typography>
            </Box>
            <Cell productId={row.pm} stage={row.stage} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
