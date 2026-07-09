'use client';
import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import type { T_FooterProps } from '../../../types';
import Navigation from './Navigation';

export default function Footer({ currentPath, onNavigate }: T_FooterProps) {
  return (
    <Paper
      component="footer"
      square
      elevation={0}
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, md: 3 },
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Navigation currentPath={currentPath} onNavigate={onNavigate} />
        <Box sx={{ flexGrow: 1 }} />
      </Box>
    </Paper>
  );
}