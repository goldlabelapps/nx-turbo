import { serverUseSlugs } from '@/app/NX/lib/serverHooks/serverUseSlugs';

describe('server/serverUseSlugs', () => {
  it('finds pages for comma-separated slug string', () => {
    const pages = serverUseSlugs('help,examples', 'free');

    expect(Array.isArray(pages)).toBe(true);
    expect(pages.length).toBeGreaterThan(0);
    expect(pages.some((p) => p.slug === '/help')).toBe(true);
    expect(pages.some((p) => p.slug === '/examples')).toBe(true);
  });

  it('ignores unknown slugs and returns empty array when nothing matches', () => {
    const pages = serverUseSlugs('definitely-not-a-real-slug', 'free');
    expect(pages).toEqual([]);
  });
});
