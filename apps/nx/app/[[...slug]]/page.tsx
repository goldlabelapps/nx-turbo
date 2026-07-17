import type { T_Tenant } from '../NX/types';
import type { ReactNode } from 'react';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NX } from '../NX';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import { normalizeTenant } from '../NX/lib/normalizeTenant';
import { RenderMarkdown } from '../NX/Shortcodes';
import { ShareVirus } from '../../public/shared/flash';

type T_NavNode = {
    title?: string;
    slug?: string;
    path?: string;
    children?: T_NavNode[];
};

function getNavHref(item: T_NavNode): string {
    if (typeof item.slug === 'string' && item.slug.trim()) {
        return item.slug;
    }
    if (typeof item.path === 'string' && item.path.trim()) {
        return item.path;
    }
    return '#';
}

function renderNavItems(items: T_NavNode[], keyPrefix = 'nav'): ReactNode {
    if (!Array.isArray(items) || !items.length) {
        return null;
    }

    return (
        <ul className="site-nav-list">
            {items.map((item, index) => {
                const key = `${keyPrefix}-${index}-${item.title || item.slug || item.path || 'node'}`;
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                return (
                    <li key={key}>
                        <a href={getNavHref(item)}>{item.title || 'Untitled'}</a>
                        {hasChildren ? renderNavItems(item.children as T_NavNode[], key) : null}
                    </li>
                );
            })}
        </ul>
    );
}

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
    const navItems = (await serverUseNav()) as T_NavNode[];
    const siteName = config?.siteName || tenant.toUpperCase();
    const pageDescription = description || config?.description || '';
    const currentPath = Array.isArray(slugArr) && slugArr.length
        ? `/${slugArr.join('/')}`
        : '/';

    return (
        <NX config={config} frontmatter={data}>
            <div className="site-shell">
                <header className="site-header">
                    <h1>{siteName}</h1>
                    <p>{title}</p>
                </header>

                <main className="site-main" id="main">
                    <aside className="site-col site-col-left" aria-label="Primary navigation">
                        <h2>Navigation</h2>
                        {renderNavItems(navItems)}
                    </aside>

                    <section className="site-col site-col-center" aria-label="Page content">
                        {pageDescription ? <p className="page-kicker">{pageDescription}</p> : null}
                        {data.cartridge ? (
                            data.cartridge === 'virus' ? (
                                <ShareVirus config={config} />
                            ) : (
                                <>
                                    <h2>{data.title || title} (CARTRIDGE)</h2>
                                    <RenderMarkdown config={config}>
                                        {content}
                                    </RenderMarkdown>
                                </>
                            )
                        ) : (
                            <RenderMarkdown config={config}>
                                {content}
                            </RenderMarkdown>
                        )}
                    </section>

                    <aside className="site-col site-col-right" aria-label="Page information">
                        <h2>Info</h2>
                        <ul className="site-meta-list">
                            <li>Tenant: {tenant}</li>
                            <li>Path: {currentPath}</li>
                            <li>
                                Source: <a href={config?.url || '/'}>{config?.url || '/'}</a>
                            </li>
                        </ul>
                    </aside>
                </main>

                <footer className="site-footer">
                    <p>{siteName}</p>
                </footer>
            </div>
        </NX>
    );
}
