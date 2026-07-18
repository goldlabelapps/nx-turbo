import docsConfig from '../../../public/config.json';

const docsContext = {
    config: docsConfig,
    markdownDir: `${process.cwd()}/public/markdown`,
    manifestPath: '/manifest.json',
};

export const getDocsContext = () => docsContext;
