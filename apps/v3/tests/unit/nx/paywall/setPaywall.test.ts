import { setPaywall } from '@/app/NX/Paywall/actions/setPaywall';
import { setUbereduxKey } from '@/app/NX/Uberedux/store';

describe('Paywall setPaywall action', () => {
  it('merges paywall state and dispatches setUbereduxKey payload', async () => {
    const dispatch = jest.fn();
    const getState = () => ({
      redux: {
        paywall: {
          uid: 'u-1',
          account: { plan: 'free' },
        },
      },
    });

    await setPaywall('accountSubscribing', true)(dispatch as any, getState as any);

    expect(dispatch).toHaveBeenCalledWith(
      setUbereduxKey({
        key: 'paywall',
        value: {
          uid: 'u-1',
          account: { plan: 'free' },
          accountSubscribing: true,
        },
      }),
    );
  });

  it('dispatches global error key when getState throws', async () => {
    const dispatch = jest.fn();
    const getState = () => {
      throw new Error('state unavailable');
    };

    await setPaywall('x', 1)(dispatch as any, getState as any);

    expect(dispatch).toHaveBeenCalledWith(
      setUbereduxKey({ key: 'error', value: 'state unavailable' }),
    );
  });
});
