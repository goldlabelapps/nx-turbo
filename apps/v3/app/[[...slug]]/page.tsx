import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import {Leida} from '../Leida'

export default async function Page(props: any) {   

    const config = getTenant('askleida');

    return <Leida config={config} />;
}
