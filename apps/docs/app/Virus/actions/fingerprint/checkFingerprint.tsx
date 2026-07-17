import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setVirus, updateHistory, onFingerprint } from '../../../Virus';
import { getFirebaseFirestore } from '../../utils/firebase';
import { randomIdentityProfile } from '../../utils/randomIdentity';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VIRUS_JUST_DELETED_SESSION_KEY = 'virus.justDeletedFingerprint';

export const checkFingerprint = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            
            const state = getState();
            const fingerprint = state?.redux?.virus?.fingerprint;
            // console.log('Checking fingerprint...', );

            if (!fingerprint || typeof fingerprint !== 'string') {
                console.log('checkFingerprint: no valid fingerprint, bailing.');
                return;
            }

            if (typeof window !== 'undefined') {
                const justDeleted = window.sessionStorage.getItem(VIRUS_JUST_DELETED_SESSION_KEY) === '1';
                if (justDeleted) {
                    // console.log('checkFingerprint: justDeleted flag set, bailing.');
                    window.sessionStorage.removeItem(VIRUS_JUST_DELETED_SESSION_KEY);
                    dispatch(setVirus('fingerprintDoc', null));
                    return;
                }
            }

            const db = getFirebaseFirestore();
            const docRef = doc(db, 'fingerprints', fingerprint);
            // console.log('checkFingerprint: calling getDoc for', fingerprint);
            const snapshot = await getDoc(docRef);
            let resolvedName = '';
            if (!snapshot.exists()) {
                console.log('No existing fingerprint found. Creating new document...');
                const now = Date.now();
                const profile = randomIdentityProfile();
                resolvedName = profile.name;
                await setDoc(docRef, {
                    created: now,
                    updated: now,
                    avatar: profile.character,
                    name: profile.name,
                });
                dispatch(onFingerprint());
                dispatch(setVirus('fingerprinted', true));
            } else {
                const snapshotData = snapshot.data();
                const existingName =
                    snapshotData && typeof snapshotData.name === 'string'
                        ? snapshotData.name
                        : null;
                resolvedName = existingName ?? '';
                const isCompleted =
                    snapshotData && typeof snapshotData.completed === 'number';
                await updateDoc(docRef, { updated: Date.now() });
            }
            dispatch(updateHistory());
            dispatch(setVirus('toggleText', resolvedName));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };