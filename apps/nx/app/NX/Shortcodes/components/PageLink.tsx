'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Paper,
  ButtonBase,
  CardHeader,
} from '@mui/material';
import { Icon, navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function PageLink({
  url = null,
  icon = 'link',
  iconAlign = 'left',
  title = null,
  description = null
}: {
  url?: string | null;
  icon?: string | null;
  iconAlign?: 'left' | 'right' | null;
  title?: string | null;
  description?: string | null;
}) {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      const isExternal = url.startsWith('http');
      dispatch(navigateTo(router, url, isExternal ? '_blank' : '_self'));
    }
  };

  const isRightAligned = iconAlign === 'right';
  const iconNode = <Icon icon={icon as any} color="primary" />;

  return (
    <ButtonBase onClick={handleClick}>
      <Paper variant="outlined">
        <CardHeader
          title={title}
          subheader={description}
          avatar={!isRightAligned ? iconNode : undefined}
          action={isRightAligned ? iconNode : undefined}
        />
      </Paper>
    </ButtonBase>
  );
}
