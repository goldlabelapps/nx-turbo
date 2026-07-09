'use client';
import * as React from 'react';
import { 
    Box,
} from '@mui/material';
import { useDispatch } from '../NX/Uberedux';
import { 
  Loading,
  Theme,
  initLayout,
  initUI,
  initAuth,
  initClients,
  initProducts,
  initRoutines,
  initTheme,
  setLayout,
} from './index';
import type { T_NXProps } from '../types';
import type { T_RootState } from '../NX/Uberedux/store';
import { useSelector } from 'react-redux';
import DesignSystemLanding from './Theme/components/DesignSystemLanding';

export default function NX({ config }: T_NXProps) {
  const dispatch = useDispatch();
  const redux = useSelector((state: T_RootState) => state.redux as any);
  const hasInitialized = React.useRef(false);

  const isAppReady = Boolean(
    redux?.auth?.initted &&
    redux?.clients?.initted &&
    redux?.products?.initted &&
    redux?.routines?.initted &&
    redux?.ui?.initted &&
    redux?.layout?.initted &&
    redux?.theme?.initted
  );

  React.useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    void dispatch(initAuth());
    void dispatch(initClients());
    void dispatch(initProducts());
    void dispatch(initRoutines());
    void dispatch(initUI());
    void dispatch(initLayout());
    void dispatch(initTheme(config));
  }, [config, dispatch]);

  React.useEffect(() => {
    void dispatch(setLayout('isLoading', !isAppReady));
  }, [dispatch, isAppReady]);

  return (
    <Theme>
      <Box
        sx={{
          minHeight: '100dvh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        {isAppReady ? (
          <DesignSystemLanding />
        ) : null}
        <Loading />
      </Box>
    </Theme>
  );
}


/* 
<pre>{JSON.stringify({ auth }, null, 2)}</pre>
<pre>{JSON.stringify({ routines }, null, 2)}</pre>
<pre>{JSON.stringify({ theme }, null, 2)}</pre>
*/