import type { T_RootState, T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';

export const setLayout =
    (key: string, value: any): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
            try {
                const state = getState();
                const current = state?.redux?.layout || {};
                const updated = { ...current, [key]: value };
                dispatch(setUbereduxKey({ key: 'layout', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
