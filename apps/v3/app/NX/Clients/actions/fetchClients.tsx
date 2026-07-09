import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setClients } from '../../../NX';
import type { T_FetchClientsResponse } from '../lib/types';

export const fetchClients = (): any =>
	async (dispatch: T_UbereduxDispatch) => {
		try {
			dispatch(setClients('fetching', true));
			dispatch(setClients('fetchFeedback', null));

			const response = await fetch('/api/clients', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json() as T_FetchClientsResponse;
			const message = result.meta?.message || 'Clients request completed.';

			if (!response.ok) {
				dispatch(setClients('fetchFeedback', {
					severity: 'error',
					message,
				}));

				return {
					ok: false,
					message,
					data: result.data,
				};
			}

			dispatch(setClients('clients', {
				meta: result.meta || null,
				query: result.data?.query || null,
				pagination: result.data?.pagination || null,
				list: Array.isArray(result.data?.list) ? result.data?.list : [],
			}));

			dispatch(setClients('fetchFeedback', {
				severity: 'success',
				message,
			}));

			return {
				ok: true,
				message,
				data: result.data,
			};
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Unable to fetch clients.';

			dispatch(setClients('fetchFeedback', {
				severity: 'error',
				message,
			}));
			dispatch(setUbereduxKey({ key: 'error', value: message }));

			return {
				ok: false,
				message,
			};
		} finally {
			dispatch(setClients('fetching', false));
		}
	};

export default fetchClients;
