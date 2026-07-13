'use client';
import * as React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import {
    Icon,
} from '../../NX/DesignSystem';

type T_DeviceDataProps = {
    device?: Record<string, unknown> | null;
};

const getDisplayValue = (value: unknown): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
};

const hasValue = (value: unknown): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
};

const renderKeyValue = (label: string, value: unknown) => (
    <Grid size={{ xs: 12, sm: 6 }} key={label}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                {getDisplayValue(value)}
            </Typography>
        </Box>
    </Grid>
);

const DeviceData = ({ device }: T_DeviceDataProps) => {
    if (!device || typeof device !== 'object' || Object.keys(device).length === 0) {
        return (
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle2">Device data</Typography>
                <Typography variant="body2" color="text.secondary">
                    No device data is available.
                </Typography>
            </Paper>
        );
    }

    const topFields: Array<[string, string]> = [
        // ['ua', 'User Agent'],
        ['browser', 'Browser'],
        ['browserVersion', 'Browser Version'],
        ['os', 'Operating System'],
        ['osVersion', 'OS Version'],
        ['platform', 'Platform'],
        ['vendor', 'Vendor'],
        ['isMobile', 'Mobile'],
        ['languages', 'Languages'],
        ['model', 'Model'],
        ['modelCode', 'Model Code'],
        ['cpu', 'CPU Architecture'],
    ];

    const nestedFields: Array<[string, string]> = [
        ['device', 'Device'],
        ['engine', 'Engine'],
    ];

    return (
        <Box sx={{ p: 2, mt: 2 }}>
            <Grid container spacing={2}>
                {topFields.map(([key, label]) =>
                    hasValue(device[key]) ? renderKeyValue(label, device[key]) : null
                )}
                {nestedFields.map(([key, label]) => {
                    const value = device[key] as Record<string, unknown> | undefined;
                    if (!value || typeof value !== 'object') return null;
                    return (
                        <Grid size={{ xs: 12 }} key={key}>
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="subtitle2">{label}</Typography>
                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    {Object.entries(value).map(([nestedKey, nestedValue]) =>
                                        hasValue(nestedValue)
                                            ? renderKeyValue(nestedKey.replace(/_/g, ' '), nestedValue)
                                            : null
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default DeviceData;
