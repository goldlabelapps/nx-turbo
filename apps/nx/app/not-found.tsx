"use client";
import React from 'react';
import { NotFound as Clip404 } from '../public/shared/flash'

export default function NotFound() {
    return (
        <>
            <Clip404 />
            <div
                style={{
                    zIndex: 1000,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
            </div>
        </>
    );
}
