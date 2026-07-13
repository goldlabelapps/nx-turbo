"use client";
import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useDispatch } from '../../NX/Uberedux';
import { 
    Icon, 
    CleverText, 
} from '../../NX/DesignSystem';
import { AvaFlag, setVirus, useVirus, useDoc } from '../../Virus';

export default function VirusButton() {

    const dispatch = useDispatch();
    const virus = useVirus();
    const doc = useDoc();
    const avatar = doc?.avatar || '';
    const geo = doc?.geo as Record<string, unknown> | undefined;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const toggleText = virus?.toggleText || '';

    useEffect(() => {
        if (!toggleText) return;
        const timeout = setTimeout(() => {
            dispatch(setVirus('toggleText', ''));
        }, 2500);
        return () => clearTimeout(timeout);
    }, [dispatch, toggleText]);

    const handleIconClick = () => {
        dispatch(setVirus('dialogOpen', true));
    };

    return <>
        <Box sx={{
            display: 'flex',
            gap: 1,
        }}>
            {!isMobile && <Box>
                <CleverText options={{
                    id: 'infoPaneCleverText',
                    markdown: toggleText,
                }} />
            </Box>}
            <Box>
                <IconButton
                    sx={{ m: 1 }}
                    color="primary"
                    onClick={handleIconClick}>
                    {avatar ? (
                        <AvaFlag
                            countryCode={typeof geo?.country_code2 === 'string' ? geo.country_code2 : 'US'}
                            avatarUrl={`/shared/svg/characters/${avatar}.svg`}
                            size={32}
                            position="bottom-right"
                        />        
                    ) : null}
                </IconButton>
            </Box>
        </Box>

    </>

}


/* 
<pre>{JSON.stringify(firestoreDoc, null, 2)}</pre> 
*/