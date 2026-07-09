'use client';
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import type {
  NXRoutePath,
  T_NXNavigationItem,
  T_NXNavigationProps,
} from '../../../types';

const ROUTE_ITEMS: T_NXNavigationItem[] = [
  { path: '/', label: 'Home' },
  { path: '/clients', label: 'Clients' },
];

export default function Navigation({ currentPath, onNavigate }: T_NXNavigationProps) {
  const handleClick =
    (path: NXRoutePath) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (event.defaultPrevented) {
        return;
      }

      if (
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }

      event.preventDefault();
      onNavigate(path);
    };

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      {ROUTE_ITEMS.map((item) => {
        const isActive = item.path === currentPath;

        return (
          <Button
            key={item.path}
            component="a"
            href={item.path}
            variant={isActive ? 'contained' : 'text'}
            color={isActive ? 'primary' : 'inherit'}
            onClick={handleClick(item.path)}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}