import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { UAParser } from 'ua-parser-js';
import deviceModels from '../../utils/deviceModels.json';

function getDeviceInfo() {
    const ua = navigator.userAgent || '';
    const parser = new UAParser(ua);
    const result = parser.getResult();

    const browserName = result.browser.name ?? 'Unknown';
    const browserVersion = result.browser.version ?? '';
    const osName = result.os.name ?? 'Unknown';
    const osVersion = result.os.version ?? '';
    const deviceType = result.device.type ?? '';
    const deviceVendor = result.device.vendor ?? '';
    const deviceModel = result.device.model ?? '';

    const modelCode = deviceModel || deviceVendor || null;
    let friendlyModel = modelCode;
    if (osName && modelCode) {
        const osMap = (deviceModels as Record<string, Record<string, string>>)[osName];
        if (osMap?.[modelCode]) friendlyModel = osMap[modelCode];
    }

    return {
        ua,
        browser: browserName,
        browserVersion,
        os: osName,
        osVersion,
        platform: navigator.platform || '',
        vendor: navigator.vendor || deviceVendor || '',
        isMobile: Boolean(deviceType || /Mobi|Android|iPhone|iPad|iPod/i.test(ua)),
        languages: navigator.languages ?? [],
        device: {
            vendor: deviceVendor,
            model: deviceModel,
            type: deviceType,
        },
        cpu: result.cpu.architecture ?? '',
        engine: {
            name: result.engine.name ?? '',
            version: result.engine.version ?? '',
        },
        ...(friendlyModel ? { model: friendlyModel } : {}),
        ...(modelCode ? { modelCode } : {}),
    };
}

export const parseDevice = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const fingerprint = getState()?.redux?.virus?.fingerprint;
            if (!fingerprint || typeof fingerprint !== 'string') return;

            const device = getDeviceInfo();

            const db = getFirebaseFirestore();
            const ref = doc(db, 'fingerprints', fingerprint);
            await updateDoc(ref, { device, updated: Date.now() });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
