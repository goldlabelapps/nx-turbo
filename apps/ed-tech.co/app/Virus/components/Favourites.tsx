'use client';
import * as React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Chip,
    Typography,
} from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

export default function Favourites() {
    return (
        <Card
            variant="outlined"
            sx={{
                borderStyle: 'dashed',
                borderColor: 'divider',
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0))',
            }}
        >
            <CardHeader
                avatar={<Box sx={{ml: 1, mt:1}}>
                    <Icon icon="features" />
                </Box>}
                title={<Typography variant="h6">
                        Favourites
                    </Typography>} 
            />
            <CardContent>
                <Box sx={{ display: 'grid', gap: 1.25 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                            variant="outlined"
                            sx={{p:1}}
                            icon={<Icon icon="save" />} 
                            label="Save" 
                            clickable
                        />
                        <Chip 
                            variant="outlined"
                            sx={{p:1}}
                            icon={<Icon icon="star" />} 
                            label="Bookmark" 
                            clickable
                        />
                        
                        <Chip 
                            variant="outlined"
                            sx={{p:1}}
                            icon={<Icon icon="share" />} 
                            label="Share" 
                            clickable
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

