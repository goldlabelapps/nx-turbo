import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import type { T_EmailClientPayload, T_EmailClientResponse } from '../../../types';
import { setClients } from '../../../NX';

export const emailClient =
    (payload: T_EmailClientPayload): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                dispatch(setClients('emailSending', true));
                dispatch(setClients('emailFeedback', null));

                const response = await fetch('/api/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...payload,
                        template: payload.template ?? 'basicEmailTemplate',
                    }),
                });

                const result = await response.json() as T_EmailClientResponse;
                const message = result.meta?.message || 'Email request completed.';

                if (!response.ok) {
                    dispatch(setClients('emailFeedback', {
                        severity: 'error',
                        message,
                    }));

                    return {
                        ok: false,
                        message,
                        data: result.data,
                    };
                }

                dispatch(setClients('emailFeedback', {
                    severity: 'success',
                    message,
                }));

                return {
                    ok: true,
                    message,
                    data: result.data,
                };
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : 'Unable to reach the email endpoint.';

                dispatch(setClients('emailFeedback', {
                    severity: 'error',
                    message,
                }));
                dispatch(setUbereduxKey({ key: 'error', value: message }));

                return {
                    ok: false,
                    message,
                };
            } finally {
                dispatch(setClients('emailSending', false));
            }
        };

export default emailClient;