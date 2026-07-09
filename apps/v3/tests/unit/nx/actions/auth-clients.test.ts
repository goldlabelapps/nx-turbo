import { set as setAuth } from '@/app/NX/Auth/actions/set';
import { fetchClients } from '@/app/NX/Clients/actions/fetchClients';
import initClients from '@/app/NX/Clients/actions/init';
import { emailClient } from '@/app/NX/Clients/actions/emailClient';
import { setUbereduxKey } from '@/app/NX/Uberedux/store';

/* eslint-disable no-var */
var setClientsMock: jest.Mock;
var fetchClientsMock: jest.Mock;
/* eslint-enable no-var */

jest.mock('@/app/NX/index.tsx', () => {
  setClientsMock = jest.fn((key: string, value: unknown) => ({
    type: 'setClients',
    payload: { key, value },
  }));

  fetchClientsMock = jest.fn(() => async () => ({ ok: true }));

  return {
    setClients: setClientsMock,
    fetchClients: fetchClientsMock,
  };
});

describe('NX Auth and Clients actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, 'fetch', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  });

  it('setAuth merges auth values and dispatches auth key payload', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ redux: { auth: { initted: true } } });

    await setAuth('token', 'abc123')(dispatch as any, getState as any);

    expect(dispatch).toHaveBeenCalledWith(
      setUbereduxKey({
        key: 'auth',
        value: {
          initted: true,
          token: 'abc123',
        },
      }),
    );
  });

  it('fetchClients dispatches loading, payload and success feedback on ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        meta: { message: 'Loaded clients' },
        data: {
          query: { search: '' },
          pagination: { page: 1, total: 2 },
          list: [{ id: 'c1' }, { id: 'c2' }],
        },
      }),
    } as any);

    const dispatch = jest.fn();
    const result = await fetchClients()(dispatch as any);

    expect(result.ok).toBe(true);
    expect(result.message).toBe('Loaded clients');
    expect(setClientsMock).toHaveBeenNthCalledWith(1, 'fetching', true);
    expect(setClientsMock).toHaveBeenNthCalledWith(2, 'fetchFeedback', null);
    expect(setClientsMock).toHaveBeenCalledWith(
      'clients',
      expect.objectContaining({
        list: [{ id: 'c1' }, { id: 'c2' }],
      }),
    );
    expect(setClientsMock).toHaveBeenCalledWith('fetchFeedback', {
      severity: 'success',
      message: 'Loaded clients',
    });
    expect(setClientsMock).toHaveBeenLastCalledWith('fetching', false);
  });

  it('fetchClients returns error shape and feedback when endpoint is non-ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        meta: { message: 'Fetch failed' },
        data: { list: [] },
      }),
    } as any);

    const dispatch = jest.fn();
    const result = await fetchClients()(dispatch as any);

    expect(result.ok).toBe(false);
    expect(result.message).toBe('Fetch failed');
    expect(setClientsMock).toHaveBeenCalledWith('fetchFeedback', {
      severity: 'error',
      message: 'Fetch failed',
    });
    expect(setClientsMock).toHaveBeenLastCalledWith('fetching', false);
  });

  it('initClients dispatches fetchClients and initted flag', async () => {
    const dispatch = jest.fn();

    await initClients()(dispatch as any);

    expect(fetchClientsMock).toHaveBeenCalledTimes(1);
    expect(setClientsMock).toHaveBeenCalledWith('initted', true);
  });

  it('emailClient sends default template and stores success feedback', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        meta: { message: 'Email sent' },
        data: { queued: true },
      }),
    } as any);

    const dispatch = jest.fn();
    const result = await emailClient({
      toEmail: 'a@b.com',
      subject: 'Hello',
      html: '<p>Hi</p>',
    } as any)(
      dispatch as any,
    );

    expect(result.ok).toBe(true);
    expect(setClientsMock).toHaveBeenCalledWith('emailFeedback', {
      severity: 'success',
      message: 'Email sent',
    });
    expect(setClientsMock).toHaveBeenLastCalledWith('emailSending', false);

    const fetchArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(fetchArgs[0]).toBe('/api/email');
    const body = JSON.parse((fetchArgs[1] as RequestInit).body as string);
    expect(body.template).toBe('basicEmailTemplate');
  });

  it('emailClient stores endpoint failure feedback for non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        meta: { message: 'Email rejected' },
        data: null,
      }),
    } as any);

    const result = await emailClient({ toEmail: 'a@b.com', subject: 'x', html: 'x' } as any)(
      jest.fn() as any,
    );

    expect(result.ok).toBe(false);
    expect(setClientsMock).toHaveBeenCalledWith('emailFeedback', {
      severity: 'error',
      message: 'Email rejected',
    });
    expect(setClientsMock).toHaveBeenLastCalledWith('emailSending', false);
  });
});
