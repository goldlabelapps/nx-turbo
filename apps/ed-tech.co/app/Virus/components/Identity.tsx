'use client';
import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    FullscreenToggle,
    Icon,
    useFullscreen,
} from '../../NX/DesignSystem';
import { useDispatch } from '../../NX/Uberedux';
import {
    identityCharacters,
    randomIdentityProfile,
    type T_IdentityCharacter,
} from '../utils';
import { 
    useFingerprint, 
    useDoc,
    updateFingerprint,
 } from '../../Virus';

type T_IconName = React.ComponentProps<typeof Icon>['icon'];

export type IdentityProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideTrigger?: boolean;
    title?: string;
    fingerprint?: string | null;
    triggerLabel?: string;
    triggerVariant?: 'text' | 'outlined' | 'contained';
    onUpdated?: (nextName: string) => void;
};

export default function Identity({
    open: controlledOpen,
    onOpenChange,
    hideTrigger = false,
    title,
    fingerprint,
    triggerLabel,
    triggerVariant = 'outlined',
    onUpdated,
}: IdentityProps) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const fullscreen = useFullscreen() || false;
    const doc = useDoc() as Record<string, unknown> | null;
    const activeFingerprint = useFingerprint();
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [openState, setOpenState] = React.useState(false);
        const open = controlledOpen ?? openState;
        const setDialogOpen = React.useCallback((nextOpen: boolean) => {
            if (controlledOpen === undefined) {
                setOpenState(nextOpen);
            }
            onOpenChange?.(nextOpen);
        }, [controlledOpen, onOpenChange]);

    const [rawValue, setRawValue] = React.useState('');
    const [selectedAvatar, setSelectedAvatar] = React.useState<T_IdentityCharacter | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [saving, setSaving] = React.useState(false);

    const resolvedFingerprint = fingerprint ?? activeFingerprint;
    const sourceName = typeof doc?.name === 'string' ? doc.name : '';
    const hasSourceValue = sourceName.trim().length > 0;
    const currentAvatar =
        typeof doc?.avatar === 'string' && identityCharacters.includes(doc.avatar as T_IdentityCharacter)
            ? (doc.avatar as T_IdentityCharacter)
            : null;
    const resolvedIcon: T_IconName = hasSourceValue ? 'edit' : 'add';
    const triggerText = triggerLabel
        ?? (hasSourceValue ? sourceName : 'Add identity');

    React.useEffect(() => {
        if (!open) return;
        setRawValue(sourceName);
        setSelectedAvatar(currentAvatar);
        setError(null);
    }, [currentAvatar, open, sourceName]);

    React.useEffect(() => {
        if (!open) return;
        const frame = requestAnimationFrame(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });

        return () => cancelAnimationFrame(frame);
    }, [open]);

    const dialogTitle = title ?? 'Identity';

    const handleOpen = () => setDialogOpen(true);

    const handleClose = () => {
        if (saving) return;
        setDialogOpen(false);
        setError(null);
    };

    const handleSave = async () => {
        if (!resolvedFingerprint) {
            setError('No fingerprint selected to update');
            return;
        }

        const nextName = rawValue.trim();
        if (!nextName) {
            setError('Name is required');
            return;
        }

        if (nextName.length < 2) {
            setError('Name must be at least 2 characters');
            return;
        }

        if (nextName.length > 80) {
            setError('Name must be no more than 80 characters');
            return;
        }

        if (!selectedAvatar) {
            setError('Avatar is required');
            return;
        }

        setSaving(true);
        await dispatch(updateFingerprint(resolvedFingerprint, 'name', nextName));
        await dispatch(updateFingerprint(resolvedFingerprint, 'avatar', selectedAvatar));
        setSaving(false);
        setDialogOpen(false);
        setError(null);
        onUpdated?.(nextName);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();
        if (saving) return;
        await handleSave();
    };

    const handleRandomIdentity = () => {
        const profile = randomIdentityProfile();
        setRawValue(profile.name);
        setSelectedAvatar(profile.character);
        setError(null);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    return (
        <>
            {!hideTrigger ? (
                <Button 
                    aria-label={triggerText}
                    onClick={handleOpen} 
                    variant={triggerVariant} 
                    color="primary" 
                    startIcon={<Icon icon={resolvedIcon} />}
                >
                    {triggerText}
                </Button>
            ) : null}

            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={fullscreen || isMobile}
                maxWidth="xs"
                fullWidth
                TransitionProps={{
                    onEntered: () => {
                        inputRef.current?.focus();
                        inputRef.current?.select();
                    },
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* <Typography variant="h6" component="span">
                            {dialogTitle}
                        </Typography> */}
                        <Box sx={{ flexGrow: 1 }} />
                        <FullscreenToggle />
                        <IconButton
                            aria-label="Close"
                            color="primary"
                            onClick={handleClose}
                        >
                            <Icon icon="close" />
                        </IconButton>
                    </Box>
                </DialogTitle>

                    <DialogContent>
                        
                    <Box>
                        <TextField
                            fullWidth
                            sx={{ px: 3 }}
                            inputRef={inputRef}
                            variant='standard'
                            type="text"
                            value={rawValue}
                            onChange={(e) => {
                                setRawValue(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                sx: { fontSize: '2.25rem' },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Tooltip title="Random identity">
                                            <IconButton
                                                color="primary"
                                                edge="start"
                                                aria-label="Generate random identity"
                                                onClick={handleRandomIdentity}
                                            >
                                                <Icon icon="random" />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title="Reset to original name">
                                            <IconButton
                                                color="secondary"
                                                edge="end"
                                                aria-label="Reset name"
                                                onClick={() => {
                                                    setRawValue(sourceName);
                                                    setSelectedAvatar(currentAvatar);
                                                }}
                                            >
                                                <Icon icon="cancel" />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                        <Box sx={{ my: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Avatar
                                alt={selectedAvatar ?? currentAvatar ?? 'Avatar preview'}
                                src={selectedAvatar || currentAvatar ? `/shared/svg/characters/${selectedAvatar ?? currentAvatar}.svg` : undefined}
                                sx={{ width: 100, height: 100 }}
                            />
                        </Box>

                        <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center' }}>

                                {identityCharacters.map((character) => {
                                    const selected = selectedAvatar === character;
                                    return (
                                        <Tooltip key={character} title={character}>
                                            <IconButton
                                                aria-label={`Select ${character} avatar`}
                                                color={selected ? 'primary' : 'default'}
                                                onClick={() => {
                                                    setSelectedAvatar(character);
                                                    setRawValue(randomIdentityProfile(character).name);
                                                    if (error) setError(null);
                                                }}
                                            >
                                                <Avatar
                                                    alt={character}
                                                    src={`/shared/svg/characters/${character}.svg`}
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    );
                                })}
                            </Box>
                            
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 2, py: 1, gap: 1 }}>
                        <Button 
                            startIcon={<Icon icon="close" />} 
                            onClick={handleClose} 
                            variant="text" 
                            disabled={saving}>
                            Cancel
                        </Button>
                        <Button 
                            startIcon={<Icon icon="save" />} 
                            onClick={handleSave}
                            variant="contained"
                            disabled={saving}>
                            Save
                        </Button>
                    </DialogActions>
            </Dialog>
        </>
    );
}