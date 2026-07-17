import type { T_Tenant } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NX } from '../NX';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import { normalizeTenant } from '../NX/lib/normalizeTenant';
import { RenderMarkdown } from '../NX/Shortcodes';
import { ShareVirus } from '../../public/shared/flash';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const tenant = normalizeTenant();
    const { config } = getTenant(tenant as T_Tenant);
    const filePath = serverUseMDBySlug(slugArr, tenant);
    let url = config.url || "";
    const themeMode: 'light' | 'dark' = 'light';
    let title = config.siteName || "";
    let description = config.description || "";
    let image = config.images?.[themeMode] || config.images?.light || "";
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data?.title) title = data.title;
        if (data?.description) description = data.description;
        if (data?.url) url = data.url;
        if (typeof data?.image === 'string' && data.image.trim()) {
            image = data.image;
        }
    }
    const slugPath = Array.isArray(slugArr) && slugArr.length ? slugArr.join("/") : "";
    const pageUrl = url.replace(/\/$/, "") + (slugPath ? `/${slugPath}` : "");

    return getMeta({
        siteName: title,
        title: `${title}, ${description}`,
        description,
        image,
        url: pageUrl,
    });
}

export async function generateStaticParams() {
    const tenant = normalizeTenant();
    const { markdownDir } = getTenant(tenant as T_Tenant);
    let allSlugs = serverUseAllMd(markdownDir, tenant);
    return allSlugs.map((slugArr) => {
        const normalized = slugArr.filter(Boolean);
        return { slug: normalized.length ? normalized : undefined };
    });
}

export default async function Page(props: any) {
    const { params } = props;
    const resolvedParams = typeof params?.then === 'function' ? await params : params;
    let slugArr = resolvedParams?.slug || [];
    while (slugArr.length > 1 && slugArr[slugArr.length - 1] === "") slugArr.pop();
    const tenant = normalizeTenant();
    const { config: rawConfig } = getTenant(tenant as T_Tenant);
    const config = { ...rawConfig, tenant: tenant as T_Tenant };
    const filePath = serverUseMDBySlug(slugArr, tenant);
    if (!filePath || !fs.existsSync(filePath)) notFound();
    let title = tenant.toUpperCase();
    let description = "";
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
        const themedImage = config?.images?.light || null;

    // Use data.image if it's a non-empty string, otherwise fallback to themedImage
    const meta = getMeta({
        siteName: config.siteName,
        title,
        description,
        url: config.url || "",
        image: (typeof data.image === 'string' && data.image.trim()) ? data.image : themedImage,
    });

    return (
            <NX config={config} frontmatter={data}>
                {data.cartridge ? (
                    data.cartridge === 'virus' ? (
                        <section id="main" style={{ marginTop: '100px', paddingBottom: '90px' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <ShareVirus config={config} />
                            </div>
                        </section>
                    ) : (
                        <section id="main" style={{ marginTop: '100px', paddingBottom: '90px' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h2>
                                    {data.title || title} (CARTRIDGE)
                                </h2>
                                <div>
                                    <RenderMarkdown config={config}>
                                        {content}
                                    </RenderMarkdown>
                                </div>
                            </div>
                        </section>
                    )
                ) : (
                    <section id="main" style={{ marginTop: '100px', paddingBottom: '90px' }}>
                        <main style={{ width: '100%', minWidth: 0, padding: '0 1rem' }}>
                            {description ? <p>{description}</p> : null}
                                <RenderMarkdown config={config}>
                                    {content}
                                </RenderMarkdown>
                        </main>
                    </section>
                )}
            </NX>
    );
}
