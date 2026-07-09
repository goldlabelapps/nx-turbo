import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Markdown',
            description: 'Upload, fetch and delete markdown files',
            path: `${baseURL}/markdown`,
            endpoints: [
                {
                    name: 'Get Markdown by Slug',
                    endpoint: `${baseURL}/api/markdown?slug=%2Ffeatures`,

                    // /api/markdown?slug=%2Ffeatures
                    method: 'GET',
                },
            ]
        },
        {
            name: 'Email',
            description: 'Send transactional emails with HTML content',
            path: `${baseURL}/email`,
            endpoints: [
                {
                    name: 'Send Email',
                    endpoint: `${baseURL}/email`,
                    method: 'POST',
                },
            ]
        },
        {
            name: 'Products',
            description: 'Publicly fetch products from Supabase',
            path: `${baseURL}/products`,
            endpoints: [
                {
                    name: 'Get Products',
                    endpoint: `${baseURL}/products`,
                    method: 'GET',
                },
            ]
        },
        {
            name: 'Clients',
            description: 'Publicly fetch clients from Supabase',
            path: `${baseURL}/clients`,
            endpoints: [
                {
                    name: 'Get Clients',
                    endpoint: `${baseURL}/clients`,
                    method: 'GET',
                },
            ]
        }
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return { endpoints };
};
