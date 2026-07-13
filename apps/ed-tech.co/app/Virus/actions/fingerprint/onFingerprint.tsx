import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setFeedback } from '../../../NX/DesignSystem';
// import { useDoc } from '../../../Virus';
import { getHistoryEntry } from '../history/updateHistory';

export const onFingerprint = (): any =>
	async (dispatch: T_UbereduxDispatch, getState: () => any) => {
		try {

			const rawPythonUrl = String(process.env.NEXT_PUBLIC_PYTHON_URL ?? '').trim();
			const pythonUrl = rawPythonUrl
				.replace(/^['"`]+|['"`]+$/g, '')
				.replace(/^(https?:)\/([^/])/, '$1//$2')
				.replace(/\/+$/, '')
				+ '/';

			if (!rawPythonUrl) {
				throw new Error('NEXT_PUBLIC_PYTHON_URL not set');
			}

			const doc = getState().redux?.virus?.fingerprintDoc;
			if (!doc) {
				throw new Error('Fingerprint document not found in state');
			}

			

			const { id, name, device, geo } = doc;
			const landingPage = getHistoryEntry();
			console.log("onFingerprint landingPage", landingPage);

			const html = `
				<strong>Name:</strong> ${name}<br />
				<strong>Device:</strong> ${device?.browser} on ${device?.os}<br />
				<strong>Location:</strong> ${geo?.city}, ${geo?.country_name} (${geo?.ip})<br />
				<strong>Fingerprint:</strong> ${id}<br /><br />
				<strong>Landing page:</strong><br />
				<strong>Title:</strong> ${landingPage?.title || 'n/a'}<br />
				<strong>URL:</strong> ${landingPage?.url || 'n/a'}<br />
				<strong>Description:</strong> ${landingPage?.description || 'n/a'}<br />
				<strong>Site:</strong> ${landingPage?.siteName || 'n/a'}<br />
				<strong>Tenant:</strong> ${landingPage?.tenant || 'n/a'}
				<strong>Favicon:</strong> ${landingPage?.favicon || 'n/a'}
			`;

			const emailData = {
				to: "goldlabel.apps@gmail.com",
				subject: "Fingerprint°",
				cta_label: "View fingerprint",
				cta_url: `https://nx-admin.goldlabel.pro/fingerprints/${id}`,
				html,
			};

			const response = await fetch(`${pythonUrl}notify/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(emailData),
			});

			if (!response.ok) {
				console.log('response', response)
				throw new Error(`Email send failed: ${response.status}`);
			}

			dispatch(setFeedback({
				severity: 'success',
				title: `Hello ${name}`,
			}));


		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			dispatch(setUbereduxKey({ key: 'error', value: msg }));
			dispatch(setFeedback({
				severity: 'error',
				title: msg,
			}));
		}
	};