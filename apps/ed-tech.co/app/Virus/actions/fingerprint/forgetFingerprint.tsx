import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { setFeedback } from '../../../NX/DesignSystem';

const VIRUS_JUST_DELETED_SESSION_KEY = 'virus.justDeletedFingerprint';

export const forgetFingerprint =
    (fingerprint: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!fingerprint || typeof fingerprint !== 'string') {
                    return false;
                }

                if (typeof window !== 'undefined') {
                    // Clear stale journey flags before deleting and redirecting.
                    window.sessionStorage.removeItem(VIRUS_JUST_DELETED_SESSION_KEY);
                }

                const db = getFirebaseFirestore();
                await deleteDoc(doc(db, 'fingerprints', fingerprint));

                dispatch(setFeedback({
                    severity: 'success',
                    title: `${fingerprint} deleted.`,
                }));

                if (typeof window !== 'undefined') {
                    window.location.replace('https://www.google.com');
                }

                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
