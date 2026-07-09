'use client';
import * as React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import type { T_HeaderProps } from '../../../types';
import { LeidaLogo } from '../../Theme/designSystem';
import Navigation from './Navigation';

export default function Header({ currentPath, onNavigate }: T_HeaderProps) {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            component="a"
            href="/"
            aria-label="Leida home"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'text.primary',
              textDecoration: 'none',
            }}
            onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              onNavigate('/');
            }}
          >
            <LeidaLogo height={28} tone="current" />
          </Box>
        </Box>
        <Navigation currentPath={currentPath} onNavigate={onNavigate} />
        <Box sx={{ flex: 1 }} />
      </Toolbar>
    </AppBar>
  );
}