'use client';
import * as React from 'react';
import './designSystem';
// eslint-disable-next-line
import './css/styles.css';
import MUI from './components/MUI';
import type { ThemeProps } from '../../types';
import { useTheme } from './hooks/useTheme';

export default function Theme({ children }: ThemeProps) {
    const theme = useTheme();

    React.useEffect(() => {
        document.body.classList.add('nx-theme-body');

        return () => {
            document.body.classList.remove('nx-theme-body');
        };
    }, []);

    return <MUI theme={theme as any}>{children}</MUI>;
}
