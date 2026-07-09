import { ageFromDoB } from '@/app/NX/lib/ageFromDoB';

const MOCK_NOW = '2026-07-07T12:00:00.000Z';

describe('NX ageFromDoB', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns Invalid age for malformed input', () => {
    expect(ageFromDoB('not-a-date')).toBe('Invalid age');
  });

  it('returns Invalid age for future dates', () => {
    jest.useFakeTimers().setSystemTime(new Date(MOCK_NOW));

    expect(ageFromDoB('2027-01-01')).toBe('Invalid age');
  });

  it('computes age when birthday has already occurred this year', () => {
    jest.useFakeTimers().setSystemTime(new Date(MOCK_NOW));

    expect(ageFromDoB('2000-01-15')).toBe('26 years old');
  });

  it('subtracts one year when birthday has not occurred yet this year', () => {
    jest.useFakeTimers().setSystemTime(new Date(MOCK_NOW));

    expect(ageFromDoB('2000-12-31')).toBe('25 years old');
  });
});
