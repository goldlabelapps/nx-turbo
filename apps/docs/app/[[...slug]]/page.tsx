import type { I_NestedNav, T_Frontmatter } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Box } from '@mui/material';
import {
    BreakingBar,
    SectionBlock,
    StoryCard,
    StoryGrid,
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
    Icon,
    Hero,
    Footer,
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
    const icon = (typeof data.icon === 'string' && data.icon.trim()) ? data.icon : null;
    const navItems = await serverUseNav();
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme 
            === 'dark') ? 'dark' : 'light';
    const themedImage = config?.images?.[themeMode] || config?.images?.light || null;

    // Use data.image if it's a non-empty string, otherwise fallback to themedImage
    const meta = getMeta({
        siteName: config.siteName,
        title,
        description,
        url: config.url || "",
        image: (typeof data.image === 'string' && data.image.trim()) ? data.image : themedImage,
    });

    const sectionLinks = (navItems || [])
        .filter((item: any) => item?.path && item?.title)
        .slice(0, 8)
        .map((item: any) => ({ label: item.title, href: item.path }));

    const primaryDescription = description || config.description || "Documentation";

    const topStories = [
        {
            label: `${title} published`,
            href: '#main',
        },
        {
            label: `${primaryDescription}`,
            href: '#main',
        },
    ];

    return (
            <NX config={config} frontmatter={data}>
                <Box sx={{ display: 'block' }}>
                    <BreakingBar label="Now Reading" items={topStories} />
                </Box>
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
                        <StoryGrid
                            lead={
                                <StoryCard
                                    eyebrow="Documentation"
                                    title={title}
                                    dek={primaryDescription}
                                    tone="default"
                                    media={
                                        <Hero
                                            config={config}
                                            frontmatter={data}
                                            navItems={navItems as I_NestedNav["navItems"]}
                                        />
                                    }
                                />
                            }
                            stories={sectionLinks.slice(0, 3).map((item) => (
                                <StoryCard
                                    key={item.href}
                                    compact
                                    title={item.label}
                                    href={item.href}
                                    tone="muted"
                                />
                            ))}
                            sideRail={
                                <SectionBlock title="Browse" actions={[{ label: 'All Sections', href: '/' }]}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                                        {sectionLinks.slice(0, 12).map((item) => (
                                            <TopicChip key={item.href} label={item.label} href={item.href} tone="muted" />
                                        ))}
                                    </div>
                                    <TreeNav navItems={navItems}/>
                                </SectionBlock>
                            }
                        />

                        <SectionBlock title={data.title || title} tone="default">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: '#5a5a5a' }}>
                                {data.icon ? (
                                    <span style={{ display: 'inline-flex', marginRight: '0.75rem' }}>
                                        <Icon icon={data.icon} color="primary" />
                                    </span>
                                ) : null}
                                <span>{description}</span>
                            </div>
                            <RenderMarkdown config={config}>
                                {content}
                            </RenderMarkdown>
                        </SectionBlock>
                    </section>
                )}
                <footer>
                    <Footer
                        meta={meta as any}
                        frontmatter={data}
                        navItems={navItems as I_NestedNav["navItems"]}
                    >
                    </Footer>
                </footer>
            </NX>
    );
}
