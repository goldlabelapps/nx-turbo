import type { T_UbereduxDispatch } from '../../../NX/types';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { setFeedback } from '../../../NX/DesignSystem';

export const updateFingerprint = (
	fingerprint: string, 
	key: string, 
	value: any,
) => async (dispatch: T_UbereduxDispatch, getState: () => any) => {
	try {
		const db = getFirebaseFirestore();
		const ref = doc(db, 'fingerprints', fingerprint);
		await updateDoc(ref, { [key]: value, updated: Date.now() });
		dispatch(setFeedback({
			severity: 'success',
			title: 'Identity updated',
		}));
	} catch (e: any) {
		const isNotFound = e?.code === 'not-found';
		dispatch(setFeedback({
			severity: isNotFound ? 'warning' : 'error',
			title: isNotFound ? 'Fingerprint not found' : e?.message,
		}));
	}
};
