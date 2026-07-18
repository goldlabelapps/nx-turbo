import type { I_NestedNav, T_Frontmatter } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Box, Paper, Typography } from '@mui/material';
import {
    SectionBlock,
    TopicChip,
} from '@nx/newspaper';
import { NX } from '../NX';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    serverUseRightRailCards,
    getDocsContext,
    getMeta,
} from '../NX/lib/index.server';
import {
    Breadcrumb,
    Hero,
    TreeNav,
} from '../NX/DesignSystem';
import { RenderMarkdown } from '../NX/Shortcodes';
import { Prospects } from '../NX/Prospects';
import { Orders } from '../NX/Orders';
import { Virus } from '../NX/Virus';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const { config } = getDocsContext();
    const filePath = serverUseMDBySlug(slugArr);
    let frontmatter: T_Frontmatter = {};
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        frontmatter = data;
    }
    let url = config.url || "";
    const themeMode: 'light' | 'dark' = 'light';
    let title = config.siteName || "";
    let description = config.description || "";
    let image = config.images?.[themeMode] || config.images?.light || "";
    let icon = null;
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data?.title) title = data.title;
        if (data?.description) description = data.description;
        if (data?.url) url = data.url;
        if (typeof data?.image === 'string' && data.image.trim()) {
            image = data.image;
        }
        if (typeof data?.icon === 'string' && data.icon.trim()) {
            icon = data.icon;
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
    const { markdownDir } = getDocsContext();
    let allSlugs = serverUseAllMd(markdownDir);
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
    const { config } = getDocsContext();
    const filePath = serverUseMDBySlug(slugArr);
    if (!filePath || !fs.existsSync(filePath)) notFound();
    let title = config.siteName || 'DOCS';
    let description = "";
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
    const navItems = await serverUseNav();

    const sectionLinks = (navItems || [])
        .filter((item: any) => item?.path && item?.title)
        .slice(0, 8)
        .map((item: any) => ({ label: item.title, href: item.path }));

    const normalizePath = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return '/';
        const withoutOrigin = trimmed.replace(/^https?:\/\/[^/]+/i, '');
        const [pathOnly] = withoutOrigin.split(/[?#]/);
        const normalized = pathOnly || '/';
        if (normalized === '/') return '/';
        return normalized.replace(/\/+$/, '');
    };

    const primaryDescription = description || config.description || "Documentation";
    const breadcrumbPath = slugArr.length > 0 ? `/${slugArr.join('/')}` : '/';
    const currentPath = normalizePath(breadcrumbPath);
    const topCategories = serverUseRightRailCards(sectionLinks, 6)
        .filter((item: { href?: string }) => {
            if (!item?.href) return true;
            return normalizePath(item.href) !== currentPath;
        });
    const sectionGutter = { xs: 2, sm: 3 };

    return (
            <NX config={config} frontmatter={data}>
                {slugArr.length > 0 ? (
                    <Breadcrumb
                        navItems={navItems as I_NestedNav["navItems"]}
                        pathname={breadcrumbPath}
                        currentLabel={title}
                        variant="stacked"
                    />
                ) : null}

                {data.cartridge ? (
                    data.cartridge === 'virus' ? (
                        <section id="main" style={{ paddingBottom: '90px' }}>
                            <SectionBlock title={data.title || title} tone="accent">
                                <Virus />
                            </SectionBlock>
                        </section>
                    ) : data.cartridge === 'orders' ? (
                        <section id="main" style={{ paddingBottom: '90px' }}>
                            <SectionBlock title={data.title || title} tone="accent">
                                <Orders />
                            </SectionBlock>
                        </section>
                    ) : data.cartridge === 'prospects' ? (
                        <section id="main" style={{ paddingBottom: '90px' }}>
                            <SectionBlock title={data.title || title} tone="accent">
                                <Prospects />
                            </SectionBlock>
                        </section>
                    ) : (
                        <section id="main" style={{ paddingBottom: '90px' }}>
                            <SectionBlock title={`${data.title || title} (CARTRIDGE)`} tone="accent">
                                <RenderMarkdown config={config}>
                                    {content}
                                </RenderMarkdown>
                            </SectionBlock>
                        </section>
                    )
                ) : (
                    <section id="main" style={{ paddingBottom: '90px' }}>
                        <Paper
                            sx={{
                                py: { xs: 2, sm: 3 },
                                px: sectionGutter,
                                borderRadius: 3,
                                background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,252,1) 100%)',
                                border: 'none',
                                boxShadow: 'none',
                            }}
                        >
                            <Typography
                                component="h1"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.6rem' },
                                    lineHeight: 1.05,
                                    fontWeight: 400,
                                    color: 'text.primary',
                                    mb: 1.25,
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.15rem' },
                                    lineHeight: 1.6,
                                    color: 'text.secondary',
                                    maxWidth: '62ch',
                                    mb: 1,
                                }}
                            >
                                {primaryDescription}
                            </Typography>
                            <Box sx={{ mt: 1.5 }}>
                                <Hero
                                    config={config}
                                    frontmatter={data}
                                    navItems={navItems as I_NestedNav["navItems"]}
                                />
                            </Box>
                        </Paper>

                        <Box
                            sx={{
                                mt: 3,
                                px: sectionGutter,
                                boxSizing: 'border-box',
                                display: 'grid',
                                gap: 2,
                                gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 320px' },
                                alignItems: 'start',
                            }}
                        >
                            <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
                                <RenderMarkdown config={config}>
                                    {content}
                                </RenderMarkdown>
                            </Box>

                            <Box sx={{ gridColumn: { xs: '1', md: '2' }, display: 'grid', gap: 1.5 }}>
                                {topCategories.map((item) => (
                                    <Paper
                                        key={item.href}
                                        component="a"
                                        href={item.href}
                                        variant="outlined"
                                        sx={{
                                            display: 'block',
                                            borderRadius: 2,
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            overflow: 'hidden',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: 2,
                                                borderColor: 'text.primary',
                                            },
                                        }}
                                    >
                                        {item.image ? (
                                            <Box
                                                component="img"
                                                src={item.image}
                                                alt={item.label}
                                                loading="lazy"
                                                sx={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: 136,
                                                    objectFit: 'cover',
                                                    borderBottom: '1px solid',
                                                    borderColor: 'divider',
                                                }}
                                            />
                                        ) : null}
                                        <Box sx={{ p: 1.5 }}>
                                            <Typography sx={{ fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.2, mb: item.snippet ? 0.75 : 0 }}>
                                                {item.label}
                                            </Typography>
                                            {item.snippet ? (
                                                <Box
                                                    sx={{
                                                        fontSize: '0.92rem',
                                                        color: 'text.secondary',
                                                        lineHeight: 1.45,
                                                        '& p': { m: 0 },
                                                        '& a': { color: 'inherit' },
                                                    }}
                                                >
                                                    <ReactMarkdown>{item.snippet}</ReactMarkdown>
                                                </Box>
                                            ) : null}
                                        </Box>
                                    </Paper>
                                ))}

                                <Box sx={{ mt: 1 }}>
                                    <Typography component="h2" sx={{ fontSize: '1.05rem', fontWeight: 400, mb: 1 }}>
                                        Topic Shortcuts
                                    </Typography>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                                        {sectionLinks.slice(0, 12).map((item) => (
                                            <TopicChip key={item.href} label={item.label} href={item.href} tone="muted" />
                                        ))}
                                    </div>
                                    <Typography component="h2" sx={{ fontSize: '1.05rem', fontWeight: 400, mb: 1 }}>
                                        Full Navigation
                                    </Typography>
                                    <TreeNav navItems={navItems}/>
                                </Box>
                            </Box>
                        </Box>
                    </section>
                )}
            </NX>
    );
}
