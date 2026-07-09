import type { T_Tenant } from '../types';
import freeConfig from '../../../public/free/config.json';
import asknxConfig from '../../../public/asknx/config.json';

export const getTenant = (tenant?: T_Tenant) => {

    const t = (tenant || process.env.NEXT_PUBLIC_TENANT || 'free') as T_Tenant;
    let config;
    let markdownDir;

    switch (t) {      

        case 'asknx':
            config = asknxConfig;
            markdownDir = process.cwd() + '/public/asknx/markdown';
            break;
        case 'free':
            config = freeConfig;
            markdownDir = process.cwd() + '/public/free/markdown';
            break;
        default:
            config = freeConfig;
            markdownDir = process.cwd() + '/public/free/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
