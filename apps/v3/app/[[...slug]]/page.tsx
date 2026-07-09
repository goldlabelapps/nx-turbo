import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import {NX} from '../NX'

export default async function Page(props: any) {   

    const config = getTenant('asknx');

    return <NX config={config} />;
}
