import type { T_Tenant } from '../types';
import edtechConfig from '../../../public/edtech/config.json';

export const getTenant = (tenant?: T_Tenant) => {

    const requestedTenant = tenant || process.env.NEXT_PUBLIC_TENANT;
    const t = requestedTenant === 'free' ? 'edtech' : requestedTenant;
    let config;
    let markdownDir;

    switch (t) {
        case 'edtech':
            config = edtechConfig;
            markdownDir = process.cwd() + '/public/edtech/markdown';
            break;
        default:
            config = edtechConfig;
            markdownDir = process.cwd() + '/public/edtech/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
