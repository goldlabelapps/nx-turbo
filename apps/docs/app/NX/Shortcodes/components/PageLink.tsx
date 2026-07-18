'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Paper,
  ButtonBase,
  CardHeader,
} from '@mui/material';
import { Icon, navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

function normalizeRoutePath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withoutOrigin = trimmed.replace(/^https?:\/\/[^/]+/i, '');
  const [pathOnly] = withoutOrigin.split(/[?#]/);
  const normalized = pathOnly || '/';
  if (normalized === '/') return '/';
  return normalized.replace(/\/+$/, '');
}

export default function PageLink({
  url = null,
  icon = null,
  title = null,
  description = null
}: {
  url?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
}) {

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const normalizedCurrentPath = normalizeRoutePath(pathname || '/');
  const normalizedTargetPath = typeof url === 'string' ? normalizeRoutePath(url) : '';
  const isExternal = typeof url === 'string' && /^https?:\/\//i.test(url);

  if (!url || (!isExternal && normalizedTargetPath === normalizedCurrentPath)) {
    return null;
  }

  const handleClick = () => {
    if (url) {
      dispatch(navigateTo(router, url, isExternal ? '_blank' : '_self'));
    }
  };

  return (
    <ButtonBase 
      onClick={handleClick}
      sx={{
        textAlign: 'left', 
        width: '100%',
        mb:1
      }}
    >
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <CardHeader 
          sx={{
            width: '100%',
            alignItems: 'flex-start',
            '.MuiCardHeader-avatar': {
              marginTop: 0,
            },
          }}
          title={title}
          subheader={description}
          avatar={icon ? <Icon icon={icon as any} color="primary" /> : undefined}
        />
      </Paper>
    </ButtonBase>
  );
}
