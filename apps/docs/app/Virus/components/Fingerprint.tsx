'use client';
import * as React from 'react';
import {
    Box,
    CardHeader,
    Typography,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
} from '@mui/material';
import { 
    Icon,
} from '../../NX/DesignSystem';
import {
    geoString,
    identityCharacters,
    useDoc,
    Identity,
    Mapbox,
    GeoData,
    DeviceData,
    History,
    AvaFlag,
} from '../../Virus';

export default function Fingerprint() {
    
    const doc = useDoc();
    const [identityEditorOpen, setIdentityEditorOpen] = React.useState(false);
    const identityTitle = typeof doc?.name === 'string' && doc.name.trim().length > 0
        ? doc.name
        : 'Add identity';
    const geo = doc?.geo as Record<string, unknown> | undefined;
    const device = doc?.device as Record<string, unknown> | undefined;
    const lat = Number(geo?.latitude ?? geo?.lat);
    const lon = Number(geo?.longitude ?? geo?.lon);
    const browser = typeof device?.browser === 'string' ? device.browser : null;
    const deviceModel = typeof device?.model === 'string' ? device.model : null;
    const city = typeof geo?.city === 'string' ? geo.city : null;
    const subheaderParts: string[] = [];
    if (browser) subheaderParts.push(browser);
    if (deviceModel) subheaderParts.push(`on ${deviceModel}`);
    if (city) subheaderParts.push(`in ${city}`);
    const geoSubheader = subheaderParts.join(' ') || doc?.id || '';
    const avatar = typeof doc?.avatar === 'string' && identityCharacters.includes(doc.avatar as any)
        ? doc.avatar
        : null;
    const map = Number.isFinite(lat) && Number.isFinite(lon)
        ? {
            lat,
            lon,
            country_code: typeof geo?.country_code2 === 'string' ? geo.country_code2 : '',
            label: geoSubheader,
        }
        : null;
    const latestHistory = React.useMemo(() => {
        const history = Array.isArray(doc?.history) ? doc.history : [];
        return history.reduce((latest: typeof history[number] | undefined, item: typeof history[number]) => {
            if (!latest || (typeof item.timestamp === 'number' && item.timestamp > latest.timestamp)) {
                return item;
            }
            return latest;
        }, undefined as typeof history[number] | undefined);
    }, [doc?.history]);

    return (
        <Box>
            
            <Identity
                title="Identity"
                open={identityEditorOpen}
                onOpenChange={setIdentityEditorOpen}
                hideTrigger
            />
            <CardHeader
                title={<Typography variant="h4">
                    {identityTitle}
                </Typography>} 
                subheader={<Typography variant="body1" color="text.secondary">
                    {geoSubheader}
                </Typography>}
                onClick={() => setIdentityEditorOpen(true)}
                aria-label={avatar ? 'Change identity' : 'Add identity'}
                sx={{
                    width: '100%',
                    textAlign: 'left',
                    border: 0,
                    background: 'none',
                    cursor: 'pointer',
                }}
                avatar={<>
                        <AvaFlag
                            countryCode={typeof geo?.country_code2 === 'string' ? geo.country_code2 : 'US'}
                            avatarUrl={`/shared/svg/characters/${avatar}.svg`}
                            size={75}
                            position="bottom-right"
                        />            
                    </>
                }
                
            />
            
            <CardContent>

                <Grid container spacing={2} sx={{ mb: 2 }}>

                    <Grid size={{ xs: 12 }}>
                        <Accordion variant='outlined' sx={{}}>
                            <AccordionSummary
                                expandIcon={<Icon icon="expand" />}
                                aria-controls="device-content"
                                id="device-header"
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Icon icon="mobile" />
                                    <Typography variant="subtitle1">
                                        Device
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <DeviceData device={doc?.device as Record<string, unknown> | undefined} />
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion variant='outlined' sx={{ mt: 1 }}>
                            <AccordionSummary
                                expandIcon={<Icon icon="expand" />}
                                aria-controls="map-content"
                                id="map-header">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ mr: 0.5 }}>
                                        <Icon icon="geo" />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                            {typeof geo?.country_name === 'string' && typeof geo?.city === 'string'
                                                ? `${geo.city}, ${geo.country_name}`
                                                : typeof geo?.country_name === 'string'
                                                    ? geo.country_name
                                                    : 'Location data'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ mb: 2 }}>
                                    <Mapbox map={map} />
                                </Box>
                                <GeoData geo={geo} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid> 
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{mt:2}}>
                            <History history={doc?.history} />
                        </Box>
                    </Grid>                    
                </Grid>  
            </CardContent>
        </Box>
    );
}

