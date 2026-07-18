import type { I_NestedNav, T_Frontmatter } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
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

    const primaryDescription = description || config.description || "Documentation";
    const topCategories = sectionLinks.slice(0, 6);
    const breadcrumbPath = slugArr.length > 0 ? `/${slugArr.join('/')}` : '/';

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
                                p: { xs: 2, sm: 3 },
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
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                        <Typography component="h2" sx={{ fontSize: '1.05rem', fontWeight: 400 }}>
                                            Sections
                                        </Typography>
                                    </Box>
                                </Box>

                                {topCategories.map((item) => (
                                    <Paper
                                        key={item.href}
                                        component="a"
                                        href={item.href}
                                        variant="outlined"
                                        sx={{
                                            display: 'block',
                                            p: 1.5,
                                            borderRadius: 2,
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: 2,
                                                borderColor: 'text.primary',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.2 }}>
                                            {item.label}
                                        </Typography>
                                    </Paper>
                                ))}

                                <Box sx={{ mt: 1 }}>
                                    <Typography component="h2" sx={{ fontSize: '1.05rem', fontWeight: 400, mb: 1 }}>
                                        Read Next
                                    </Typography>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                                        {sectionLinks.slice(0, 12).map((item) => (
                                            <TopicChip key={item.href} label={item.label} href={item.href} tone="muted" />
                                        ))}
                                    </div>
                                    <TreeNav navItems={navItems}/>
                                </Box>
                            </Box>
                        </Box>
                    </section>
                )}
            </NX>
    );
}
