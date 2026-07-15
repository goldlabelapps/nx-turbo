import { serverUseNav } from '@/app/NX/lib/serverHooks/serverUseNav';

describe('serverUseNav', () => {
  it('builds a navigation tree from nx tenant markdown', async () => {
    const originalTenant = process.env.NEXT_PUBLIC_TENANT;
    process.env.NEXT_PUBLIC_TENANT = 'nx';

    const nav = await serverUseNav();

    expect(nav.length).toBeGreaterThan(0);
    expect(nav.some((item) => item.path === '/')).toBe(true);
    expect(nav.some((item) => item.path === '/help')).toBe(true);

    process.env.NEXT_PUBLIC_TENANT = originalTenant;
  });
});
