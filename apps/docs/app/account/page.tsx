import type { T_Frontmatter } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Box, Link as MuiLink, Paper, Typography } from '@mui/material';
import {
    StoryGrid,
    TopicChip,
} from '@nx/newspaper';
import { NX } from '../NX';
import { 
    serverUseMDBySlug, 
    serverUseAllMd, 
    serverUseNav, 
    getDocsContext, 
    getMeta 
} from '../NX/lib/index.server';
import {
    Breadcrumb,
    TreeNav,
} from '../NX/DesignSystem';
import {
    Account,
} from '../NX/Paywall';

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
        .slice(0, 10)
        .map((item: any) => ({ label: item.title, href: item.path }));
    const topCategories = sectionLinks.slice(0, 6);

    const primaryDescription = description || config.description || 'Account overview';

    return (
            <NX config={config} frontmatter={data}>
                <Breadcrumb
                    navItems={navItems as any[]}
                    pathname="/account"
                    currentLabel="Account"
                    label="Now Reading"
                />

                <section id="main" style={{ paddingBottom: '90px' }}>
                    <StoryGrid
                        lead={
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
                                    component="p"
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        color: 'text.secondary',
                                        mb: 1,
                                    }}
                                >
                                    Membership
                                </Typography>
                                <Typography
                                    component="h1"
                                    sx={{
                                        fontSize: { xs: '2rem', md: '2.4rem' },
                                        lineHeight: 1.05,
                                        fontWeight: 800,
                                        color: 'text.primary',
                                        mb: 1.25,
                                    }}
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        lineHeight: 1.6,
                                        color: 'text.secondary',
                                        maxWidth: '62ch',
                                    }}
                                >
                                    {primaryDescription}
                                </Typography>
                            </Paper>
                        }
                        stories={topCategories.map((item, index) => (
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
                                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'text.secondary' }}>
                                    Top Category {index + 1}
                                </Typography>
                                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.2, mt: 0.4 }}>
                                    {item.label}
                                </Typography>
                            </Paper>
                        ))}
                    />

                    <Box sx={{ mt: 3 }}>
                        <Typography component="h2" sx={{ fontSize: { xs: '1.35rem', md: '1.6rem' }, fontWeight: 800, mb: 1.25 }}>
                            Your Account
                        </Typography>
                        <Account />
                    </Box>

                    <Box sx={{ mt: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
                            <Typography component="h2" sx={{ fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 800 }}>
                                Read Next
                            </Typography>
                            <MuiLink href="/" underline="hover" sx={{ fontWeight: 600 }}>
                                All Sections
                            </MuiLink>
                        </Box>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                            {sectionLinks.slice(0, 12).map((item) => (
                                <TopicChip key={item.href} label={item.label} href={item.href} tone="muted" />
                            ))}
                        </div>
                        <TreeNav navItems={navItems}/>
                    </Box>
                </section>
            </NX>
    );
}
