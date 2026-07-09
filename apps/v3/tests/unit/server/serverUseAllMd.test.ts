import { serverUseAllMd } from '@/app/NX/lib/serverHooks/serverUseAllMd';

describe('server/serverUseAllMd', () => {
  it('returns root slug and nested slugs for free tenant markdown', () => {
    const slugs = serverUseAllMd(undefined, 'free');

    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs.some((entry) => entry.length === 0)).toBe(true);
    expect(slugs.some((entry) => entry.join('/') === 'help')).toBe(true);
  });

  it('returns empty array for missing directory', () => {
    const slugs = serverUseAllMd('public/does-not-exist', 'free');
    expect(slugs).toEqual([]);
  });
});
