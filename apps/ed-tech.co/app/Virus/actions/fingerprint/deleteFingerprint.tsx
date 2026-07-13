import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { setFeedback } from '../../../NX/DesignSystem';

const VIRUS_JUST_DELETED_SESSION_KEY = 'virus.justDeletedFingerprint';

export const deleteFingerprint =
    (fingerprint: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!fingerprint || typeof fingerprint !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await deleteDoc(doc(db, 'fingerprints', fingerprint));

                if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem(VIRUS_JUST_DELETED_SESSION_KEY, '1');
                }

                dispatch(setFeedback({
                    severity: 'success',
                    title: `${fingerprint} deleted.`,
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };

        