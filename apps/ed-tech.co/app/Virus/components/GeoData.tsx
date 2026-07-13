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

type T_GeoDataProps = {
    geo?: Record<string, unknown> | null;
};

const getDisplayValue = (value: unknown): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
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

const GeoData = ({ geo }: T_GeoDataProps) => {
    if (!geo || typeof geo !== 'object' || Object.keys(geo).length === 0) {
        return (
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle2">Geo data</Typography>
                <Typography variant="body2" color="text.secondary">
                    No geographic data is available.
                </Typography>
            </Paper>
        );
    }

    const locationFields: Array<[string, string]> = [
        ['city', 'City'],
        ['district', 'District'],
        ['state_prov', 'State / Province'],
        ['state_code', 'State Code'],
        ['zipcode', 'Zip Code'],
        ['country_name', 'Country'],
        ['country_name_official', 'Country (Official)'],
        ['country_code2', 'Country Code'],
        ['country_code3', 'Country Code 3'],
        ['continent_name', 'Continent'],
        ['continent_code', 'Continent Code'],
    ];

    const networkFields: Array<[string, string]> = [
        ['ip', 'IP Address'],
        ['calling_code', 'Calling Code'],
        ['connection_type', 'Connection Type'],
        ['isp', 'ISP'],
        ['organization', 'Organization'],
        ['is_eu', 'In EU'],
    ];

    const coordinateFields: Array<[string, string]> = [
        ['latitude', 'Latitude'],
        ['longitude', 'Longitude'],
    ];

    const timezone = geo.time_zone as Record<string, unknown> | undefined;
    const currency = geo.currency as Record<string, unknown> | undefined;

    return (
        <Box sx={{ p: 2, mt: 2 }}>

            <Grid container spacing={2}>
                {locationFields.map(([key, label]) =>
                    geo[key] !== undefined ? renderKeyValue(label, geo[key]) : null
                )}

                {coordinateFields.map(([key, label]) =>
                    geo[key] !== undefined ? renderKeyValue(label, geo[key]) : null
                )}

                {networkFields.map(([key, label]) =>
                    geo[key] !== undefined ? renderKeyValue(label, geo[key]) : null
                )}

                {typeof geo.country_emoji === 'string' && geo.country_emoji ? (
                    renderKeyValue('Country Emoji', geo.country_emoji)
                ) : null}

                {typeof geo.country_flag === 'string' && geo.country_flag ? (
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Flag URL
                            </Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {geo.country_flag}
                            </Typography>
                        </Box>
                    </Grid>
                ) : null}

                {timezone ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="subtitle2">Time zone</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {Object.entries(timezone).map(([key, value]) =>
                                    value !== undefined && value !== null
                                        ? renderKeyValue(key.replace(/_/g, ' '), value)
                                        : null
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                ) : null}

                {currency ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="subtitle2">Currency</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {Object.entries(currency).map(([key, value]) =>
                                    value !== undefined && value !== null
                                        ? renderKeyValue(key.replace(/_/g, ' '), value)
                                        : null
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
};

export default GeoData;
