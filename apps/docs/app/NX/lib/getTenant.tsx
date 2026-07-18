import type { T_Tenant } from '../types';
import docsConfig from '../../../public/docs/config.json';

export const getTenant = (tenant?: T_Tenant) => {

    const requestedTenant = tenant || process.env.NEXT_PUBLIC_TENANT;
    const t = requestedTenant === 'free' || requestedTenant === 'edtech' ? 'docs' : requestedTenant;
    let config;
    let markdownDir;

    switch (t) {
        case 'docs':
            config = docsConfig;
            markdownDir = process.cwd() + '/public/docs/markdown';
            break;
        default:
            config = docsConfig;
            markdownDir = process.cwd() + '/public/docs/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
