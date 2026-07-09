import { getTenant } from '@/app/NX/lib/getTenant';

describe('getTenant', () => {
  it('defaults to free tenant when no tenant is provided', () => {
    const result = getTenant();

    expect(result.tenant).toBe('free');
    expect(result.markdownDir.endsWith('/public/free/markdown')).toBe(true);
    expect(result.config?.tenant).toBe('free');
  });

  it('resolves free tenant explicitly', () => {
    const result = getTenant('free');

    expect(result.tenant).toBe('free');
    expect(result.config?.siteName).toBeTruthy();
  });
});
