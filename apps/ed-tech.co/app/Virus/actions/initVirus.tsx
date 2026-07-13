import type { T_UbereduxDispatch } from '../../NX/types';
import { setUbereduxKey } from '../../NX/Uberedux';
import { setDesignSystem } from '../../NX/DesignSystem';
import { 
    setVirus,
} from '../../Virus';

let fingerprintAgentPromise: Promise<{
    get: () => Promise<{ visitorId: string }>;
}> | null = null;

export const initVirus = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {

            const state = getState();
            const virus = state?.redux?.virus || {};

            // dispatch(setVirus('dialogOpen', true));
            
            if (typeof window !== 'undefined') {
                if (!fingerprintAgentPromise) {
                    fingerprintAgentPromise = import('@fingerprintjs/fingerprintjs').then(
                        ({ default: FingerprintJS }) => FingerprintJS.load()
                    );
                }

                const fingerprintAgent = await fingerprintAgentPromise;
                const { visitorId } = await fingerprintAgent.get();
                dispatch(setVirus('fingerprint', visitorId));
            }

            if (!('topViruses' in virus)) {
                dispatch(setVirus('topViruses', {
                    fetching: false,
                    fetched: false,
                    data: [],
                    error: null,
                }));
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
    