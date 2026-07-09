'use client';
import * as React from 'react';
import { 
    Box,
} from '@mui/material';
import type { WrapperProps } from '../../../types';

export default function Wrapper({ children }: WrapperProps) {
    return (
        <Box
            className="lookAndFeelPaper"
            sx={{
                width: '100%',
                maxWidth: { xs: '600px !important', md: '600px !important' },
                mx: 'auto',
                textAlign: 'left',
                '& .lookAndFeelOverline, & .lookAndFeelHeading': {
                    textAlign: { xs: 'center', md: 'left' },
                },
                '& .lookAndFeelLead': {
                    textAlign: 'left',
                },
            }}
        >
            {children}
        </Box>
    );
}
