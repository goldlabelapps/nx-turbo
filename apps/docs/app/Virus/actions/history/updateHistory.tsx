import type { T_UbereduxDispatch } from '../../../NX/types';
import type { T_HistoryEntry } from '../../types';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { setFeedback } from '../../../NX/DesignSystem';

export const getHistoryEntry = (): T_HistoryEntry | null => {
	if (typeof window === 'undefined') {
		return null;
	}

	const title = window.document.title || '';
	const url = window.location.href;
	const descriptionMeta = window.document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
	const ogDescriptionMeta = window.document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
	const featuredImageMeta = window.document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
	const twitterImageMeta = window.document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null;

	return {
		timestamp: Date.now(),
		title,
		description: descriptionMeta?.content || ogDescriptionMeta?.content || '',
		featuredImage: featuredImageMeta?.content || twitterImageMeta?.content || '',
		url,
		slug: new URL(url).pathname,
		tenant: '',
		siteName: '',
		favicon: '',
	};
};

export const updateHistory = () => async (
	dispatch: T_UbereduxDispatch,
	getState: () => any,
) => {
	try {
		const historyEntry = getHistoryEntry();
		if (!historyEntry) {
			console.log('updateHistory: client-only history creation skipped on server');
			return;
		}

		const state = getState();
		const config = state?.redux?.designSystem?.config;
		const fingerprint = state?.redux?.virus?.fingerprint;
		if (!fingerprint || typeof fingerprint !== 'string') {
			console.log('updateHistory: no fingerprint available to append history');
			return;
		}

		// Add tenant and siteName from config
		historyEntry.tenant = config?.tenant || '';
		historyEntry.siteName = config?.siteName || '';
		historyEntry.favicon = config?.favicon 
			? window.location.origin + config.favicon
			: '';
		historyEntry.featuredImage = historyEntry.featuredImage
			? window.location.origin + historyEntry.featuredImage
			: '';

		const db = getFirebaseFirestore();
		const ref = doc(db, 'fingerprints', fingerprint);
		
		// Check existing history to avoid duplicates and prepend new entry
		const snapshot = await getDoc(ref);
		const existingData = snapshot.data();
		const existingHistory = existingData?.history as T_HistoryEntry[] | undefined;
		
		// If the first history entry has the same URL, don't add a new one
		if (existingHistory && existingHistory.length > 0) {
			const firstEntry = existingHistory[0];
			if (firstEntry.url === historyEntry.url) {
				console.log('updateHistory: skipping duplicate URL entry');
				return;
			}
		}
		
		// Prepend new entry to the beginning of the array (most recent first)
		const updatedHistory = [historyEntry, ...(existingHistory || [])];
		
		await updateDoc(ref, {
			history: updatedHistory,
			updated: Date.now(),
		});
		// dispatch(setFeedback({
		// 	severity: 'success',
		// 	title: 'History updated',
		// }));
	} catch (e: any) {
		const isNotFound = e?.code === 'not-found';
		dispatch(setFeedback({
			severity: isNotFound ? 'warning' : 'error',
			title: isNotFound ? 'Fingerprint not found' : e?.message,
		}));
	}
};
