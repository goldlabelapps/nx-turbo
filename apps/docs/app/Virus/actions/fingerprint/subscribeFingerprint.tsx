import type { Dispatch } from 'redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { getFirebaseFirestore } from '../../utils/firebase';
import { setVirus } from '../../../Virus';

let activeSubscription: (() => void) | null = null;
let subscribedFingerprint: string | null = null;

export const subscribeFingerprint = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            console.log('Subscribing to fingerprint changes...');
            const fingerprint = getState()?.redux?.virus?.fingerprint;
            if (!fingerprint || typeof fingerprint !== 'string') return;

            // Already subscribed to this fingerprint — nothing to do
            if (activeSubscription && subscribedFingerprint === fingerprint) return;

            // Fingerprint changed — clean up previous subscription
            if (activeSubscription) {
                activeSubscription();
                activeSubscription = null;
                subscribedFingerprint = null;
            }

            const db = getFirebaseFirestore();
            const docRef = doc(db, 'fingerprints', fingerprint);

            subscribedFingerprint = fingerprint;
            activeSubscription = onSnapshot(docRef, (snapshot) => {
                const data = snapshot.exists()
                    ? { id: snapshot.id, ...snapshot.data() }
                    : null;
                dispatch(setVirus('fingerprintDoc', data));

                dispatch(setVirus(
                    'clever',
                    `Something changed in your fingerprint...`
                ));

            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };

export const unsubscribeFingerprint = () => (dispatch: Dispatch) => {
    if (activeSubscription) {
        activeSubscription();
        activeSubscription = null;
        subscribedFingerprint = null;
    }
    dispatch(setVirus('fingerprintDoc', null));
};