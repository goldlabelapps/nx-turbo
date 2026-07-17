"use client";
import React from "react";
import config from '../config.json';
import {
    Box,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
    Typography,
} from '@mui/material';
import { useDispatch } from '../../NX/Uberedux';
import { 
    Icon,
    ConfirmAction,
    setFeedback,
    FullscreenToggle,
    useFullscreen,
} from '../../NX/DesignSystem';
import { 
    setVirus,
} from '../actions/setVirus';
import Fingerprint from './Fingerprint';
import { useDoc, useVirus, forgetFingerprint, AvaFlag } from '../../Virus';

export default function VirusDialog() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const virus = useVirus();
    const doc = useDoc();
    const dialogOpen = !!virus.dialogOpen;
    const fingerprint = virus.fingerprint;
    const fullscreen = useFullscreen() || false;
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleDeleteRequest = () => setConfirmOpen(true);
    const handleDeleteCancel = () => setConfirmOpen(false);
    const handleDeleteConfirm = async () => {
        setConfirmOpen(false);
        if (!fingerprint || typeof fingerprint !== 'string') {
            dispatch(setFeedback({
                severity: 'error',
                title: 'No fingerprint found to delete.',
            }));
            return;
        }

        const deleted = await dispatch(forgetFingerprint(fingerprint));
        dispatch(setVirus('dialogOpen', false));

        if (!deleted) {
            dispatch(setFeedback({
                severity: 'error',
                title: 'Unable to delete fingerprint.',
            }));
        }
    };

    const handleClose = () => {
        dispatch(setVirus('dialogOpen', false));
    };

    return <>
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            fullScreen={fullscreen || isMobile}
            fullWidth
            maxWidth="sm">
            <DialogTitle>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                }}>
                    <Box sx={{mt:1}}>
                        <Icon icon="virus" />
                    </Box>
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="h5">
                            Virus°
                        </Typography>
                    </Box>
                    <Box sx={{flexGrow: 1}}/>
                    <FullscreenToggle />
                    <IconButton onClick={handleClose} color="primary">
                        <Icon icon="close" />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{mb: 3}}>
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Fingerprint />
                    </Grid>
                </Grid>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleDeleteRequest}
                    startIcon={<Icon icon="forget" />}
                    color="primary"
                    variant="text"
                    sx={{
                        ml: 1
                    }}
                >
                    Forget Me
                </Button>
                <Box sx={{flexGrow: 1}} />
                <Typography variant="subtitle2" color="textSecondary"
                    sx={{
                        display: 'block',
                        opacity: 0.75,
                        mr: 2
                    }}>
                    {config.version}
                </Typography>
            </DialogActions>
        </Dialog>

        <ConfirmAction
            open={confirmOpen}
            handleClose={handleDeleteCancel}
            handleConfirm={handleDeleteConfirm}
            icon="forget"
            title="Forget me?"
            body="You have the right to be forgotten. Confirming will permanently remove all data tied to your device, no traces left behind. If you visit again, a new fingerprint will be created"
        />
    </>
}
