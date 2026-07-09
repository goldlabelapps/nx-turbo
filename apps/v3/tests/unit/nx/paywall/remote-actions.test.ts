jest.mock('@/app/NX/Paywall', () => ({
  setPaywall: jest.fn((key: string, value: unknown) => ({
    type: 'setPaywall',
    payload: { key, value },
  })),
}));

jest.mock('@/app/NX/DesignSystem', () => ({
  setFeedback: jest.fn((payload: unknown) => ({
    type: 'setFeedback',
    payload,
  })),
}));

jest.mock('@/app/NX/lib/firebase', () => ({
  getFirebaseFirestore: jest.fn(() => ({ mocked: 'firestore' })),
  getFirebaseAuth: jest.fn(() => ({ mocked: 'auth' })),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => 'collection-ref'),
  query: jest.fn(() => 'query-ref'),
  where: jest.fn(() => 'where-ref'),
  onSnapshot: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

import { subscribeAccount } from '@/app/NX/Paywall/actions/subscribeAccount';
import { updateAccount } from '@/app/NX/Paywall/actions/updateAccount';
import { avatarsByUID } from '@/app/NX/Paywall/actions/avatarsByUID';
import { firebaseLogin, firebaseLogout } from '@/app/NX/Paywall/actions/firebaseAuth';
import { setPaywall } from '@/app/NX/Paywall';
import { setFeedback } from '@/app/NX/DesignSystem';
import {
  onSnapshot,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

describe('Paywall remote action flows', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('subscribeAccount sets paywall error when uid is missing', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ redux: { paywall: {} } });

    await subscribeAccount()(dispatch as any, getState as any);

    expect(setPaywall).toHaveBeenCalledWith('error', 'No UID found');
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'setPaywall',
        payload: { key: 'error', value: 'No UID found' },
      }),
    );
  });

  it('subscribeAccount updates account and clears error when snapshot has a doc', async () => {
    (onSnapshot as jest.Mock).mockImplementation((_q, onNext) => {
      onNext({
        empty: false,
        docs: [
          {
            id: 'acct-1',
            data: () => ({ uid: 'u1', tier: 'pro' }),
          },
        ],
      });
    });

    const dispatch = jest.fn();
    const getState = () => ({ redux: { paywall: { uid: 'u1' } } });

    await subscribeAccount()(dispatch as any, getState as any);

    expect(setPaywall).toHaveBeenCalledWith('account', {
      id: 'acct-1',
      uid: 'u1',
      tier: 'pro',
    });
    expect(setPaywall).toHaveBeenCalledWith('error', null);
    expect(setPaywall).toHaveBeenCalledWith('accountSubscribing', false);
  });

  it('updateAccount warns when account record is missing', async () => {
    (getDocs as jest.Mock).mockResolvedValue({ empty: true, docs: [] });

    const dispatch = jest.fn();
    const getState = () => ({ redux: { paywall: { uid: 'u1' } } });

    await updateAccount('name', 'New Name')(dispatch as any, getState as any);

    expect(setPaywall).toHaveBeenCalledWith('error', 'Account not found');
    expect(setFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'warning',
        title: 'Account not found',
        description: 'u1',
      }),
    );
  });

  it('updateAccount writes document and sends success feedback', async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      empty: false,
      docs: [{ ref: 'doc-ref-1' }],
    });
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const dispatch = jest.fn();
    const getState = () => ({ redux: { paywall: { uid: 'u1' } } });

    await updateAccount('tier', 'enterprise', 'Tier updated')(dispatch as any, getState as any);

    expect(updateDoc).toHaveBeenCalledWith(
      'doc-ref-1',
      expect.objectContaining({ tier: 'enterprise', updated: expect.any(Number) }),
    );
    expect(setFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'info',
        title: 'Tier updated',
      }),
    );
  });

  it('avatarsByUID does nothing when uid is missing', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ redux: { paywall: {} } });

    await avatarsByUID()(dispatch as any, getState as any);

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('avatarsByUID stores mapped avatars from snapshot docs', async () => {
    (onSnapshot as jest.Mock).mockImplementation((_q, onNext) => {
      onNext({
        forEach: (cb: (doc: any) => void) => {
          cb({ id: 'a1', data: () => ({ name: 'One' }) });
          cb({ id: 'a2', data: () => ({ name: 'Two' }) });
        },
      });
    });

    const dispatch = jest.fn();
    const getState = () => ({ redux: { paywall: { uid: 'u1' } } });

    await avatarsByUID()(dispatch as any, getState as any);

    expect(setPaywall).toHaveBeenCalledWith('avatarsByUID', {
      a1: { name: 'One' },
      a2: { name: 'Two' },
    });
  });

  it('firebaseLogin returns user and sends success feedback', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: 'u1', email: 'user@example.com' },
    });
    const dispatch = jest.fn();

    const user = await firebaseLogin('user@example.com', 'pw', dispatch as any);

    expect(user).toEqual({ uid: 'u1', email: 'user@example.com' });
    expect(setFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'success',
        title: 'Hello user@example.com',
      }),
    );
  });

  it('firebaseLogout calls signOut', async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);

    await firebaseLogout();

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
