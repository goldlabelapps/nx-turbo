"use client";
import React, { useState } from 'react';
import { CardActions, Button, TextField } from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { setPaywall } from '../../Paywall';

export interface I_Register {
    onSignIn?: (email: string, password: string) => void;
}

export default function Register({ onSignIn: _onSignIn }: I_Register) {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSignin = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        dispatch(setPaywall('mode', 'signin'));
    };

    const handleSignup = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        
    };
    
    return (
        <>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <CardActions>
            <Button
                type="submit"
                fullWidth
                endIcon={<Icon icon="signin" />}
                variant="text"
                sx={{ mt: 1, mr: 2 }}
                onClick={handleSignin}
            >
                Sign In
            </Button>
            <Button
                fullWidth
                startIcon={<Icon icon="signup" />}
                variant="outlined"
                sx={{ mt: 1, mr: 2 }}
                onClick={handleSignup}
                disabled
            >
                Register
            </Button>
            </CardActions>
        </>            
    );
}
