import { serverUseMDBySlug } from '@/app/NX/lib/serverHooks/serverUseMDBySlug';

describe('serverUseMDBySlug', () => {
  it('finds root markdown by empty slug array', () => {
    const filePath = serverUseMDBySlug([], 'free');

    expect(filePath).toBeTruthy();
    expect(filePath?.endsWith('public/free/markdown/index.md')).toBe(true);
  });

  it('finds nested markdown by slug segments', () => {
    const filePath = serverUseMDBySlug(['help'], 'free');

    expect(filePath).toBeTruthy();
    expect(filePath?.endsWith('public/free/markdown/help/index.md')).toBe(true);
  });
});
