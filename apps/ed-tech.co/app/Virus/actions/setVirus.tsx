import type { T_UbereduxDispatch } from '../../NX/types';
import { setUbereduxKey } from '../../NX/Uberedux';

export const setVirus =
    (key: string, value: any): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => any) => {
            try {
                const state = getState();
                const current = (state?.redux?.virus) || {};
                const updated = { ...current, [key]: value };
                dispatch(setUbereduxKey({ key: 'virus', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };

        