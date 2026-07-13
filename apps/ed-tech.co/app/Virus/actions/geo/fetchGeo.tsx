import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const inFlight = new Set<string>();
const resolved = new Set<string>();

export const fetchGeo = (): any =>
	async (dispatch: T_UbereduxDispatch, getState: () => any) => {
		let requestFingerprint: string | null = null;
		try {
			if (typeof window === 'undefined') return;

			const state = getState();
			const fingerprint = state?.redux?.virus?.fingerprint;
			const fingerprintDoc = state?.redux?.virus?.fingerprintDoc;

			if (!fingerprint || typeof fingerprint !== 'string') return;
			requestFingerprint = fingerprint;
			if (fingerprintDoc?.geo) {
				resolved.add(fingerprint);
				return;
			}
			if (resolved.has(fingerprint) || inFlight.has(fingerprint)) return;

			const apiKey = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;
			if (!apiKey) {
				dispatch(setUbereduxKey({
					key: 'error',
					value: 'Missing NEXT_PUBLIC_IPGEOLOCATION_API_KEY',
				}));
				return;
			}

			inFlight.add(fingerprint);

			const response = await fetch(
				`https://api.ipgeolocation.io/ipgeo?apiKey=${encodeURIComponent(apiKey)}`
			);

			if (!response.ok) {
				throw new Error(`ipgeolocation failed: ${response.status}`);
			}

			const geo = await response.json();

			const db = getFirebaseFirestore();
			const ref = doc(db, 'fingerprints', fingerprint);
			await updateDoc(ref, {
				geo,
				updated: Date.now(),
			});

			resolved.add(fingerprint);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			dispatch(setUbereduxKey({ key: 'error', value: msg }));
		} finally {
			if (requestFingerprint) inFlight.delete(requestFingerprint);
		}
	};