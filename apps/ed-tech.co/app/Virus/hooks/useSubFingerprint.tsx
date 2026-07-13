'use client';
import { useEffect } from 'react';
import { useDispatch } from '../../NX/Uberedux';
import { useFingerprint } from './useFingerprint';
import { setVirus } from '../actions/setVirus';
import { getFirebaseFirestore } from '../utils/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export function useSubFingerprint() {
    const dispatch = useDispatch();
    const fingerprint = useFingerprint();

    useEffect(() => {
        if (!fingerprint || typeof fingerprint !== 'string') return;

        const db = getFirebaseFirestore();
        const docRef = doc(db, 'fingerprints', fingerprint);

        const unsub = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.exists()
                ? { id: snapshot.id, ...snapshot.data() }
                : null;
            dispatch(setVirus('fingerprintDoc', data));
        });

        return () => unsub();
    }, [fingerprint, dispatch]);
}
