import * as React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store, resetUberedux, setUbereduxKey } from '@/app/NX/Uberedux/store';

/* eslint-disable no-var */
var initAuthMock: jest.Mock;
var initClientsMock: jest.Mock;
var initProductsMock: jest.Mock;
var initRoutinesMock: jest.Mock;
var initUIMock: jest.Mock;
var initLayoutMock: jest.Mock;
var initThemeMock: jest.Mock;
var setLayoutMock: jest.Mock;
/* eslint-enable no-var */

jest.mock('@/app/Leida/index', () => {
  const ReactLocal = require('react');

  initAuthMock = jest.fn(() => ({ type: 'TEST_INIT_AUTH' }));
  initClientsMock = jest.fn(() => ({ type: 'TEST_INIT_CLIENTS' }));
  initProductsMock = jest.fn(() => ({ type: 'TEST_INIT_PRODUCTS' }));
  initRoutinesMock = jest.fn(() => ({ type: 'TEST_INIT_ROUTINES' }));
  initUIMock = jest.fn(() => ({ type: 'TEST_INIT_UI' }));
  initLayoutMock = jest.fn(() => ({ type: 'TEST_INIT_LAYOUT' }));
  initThemeMock = jest.fn(() => ({ type: 'TEST_INIT_THEME' }));
  setLayoutMock = jest.fn((key: string, value: unknown) => ({
    type: 'TEST_SET_LAYOUT',
    payload: { key, value },
  }));

  return {
    __esModule: true,
    Clients: () => ReactLocal.createElement('div', { 'data-testid': 'clients-page' }, 'Clients'),
    Footer: ({ currentPath }: { currentPath: string }) =>
      ReactLocal.createElement('div', { 'data-testid': 'footer' }, currentPath),
    Header: ({ onNavigate, currentPath }: { onNavigate: (path: '/clients') => void; currentPath: string }) =>
      ReactLocal.createElement(
        'button',
        {
          type: 'button',
          onClick: () => onNavigate('/clients'),
          'data-testid': 'header-nav-btn',
          'data-path': currentPath,
        },
        'Navigate clients',
      ),
    Home: () => ReactLocal.createElement('div', { 'data-testid': 'home-page' }, 'Home'),
    Loading: () => ReactLocal.createElement('div', { 'data-testid': 'loading' }, 'Loading'),
    Example: () => ReactLocal.createElement('div', { 'data-testid': 'theme-page' }, 'Theme'),
    Products: () => ReactLocal.createElement('div', { 'data-testid': 'products-page' }, 'Products'),
    Routines: () => ReactLocal.createElement('div', { 'data-testid': 'routines-page' }, 'Routines'),
    Theme: ({ children }: { children: React.ReactNode }) =>
      ReactLocal.createElement('div', { 'data-testid': 'theme-wrapper' }, children),
    initAuth: initAuthMock,
    initClients: initClientsMock,
    initProducts: initProductsMock,
    initRoutines: initRoutinesMock,
    initUI: initUIMock,
    initLayout: initLayoutMock,
    initTheme: initThemeMock,
    setLayout: setLayoutMock,
  };
});

import Leida from '@/app/Leida/Leida';

function setReadyState() {
  store.dispatch(setUbereduxKey({ key: 'auth', value: { initted: true } }));
  store.dispatch(setUbereduxKey({ key: 'clients', value: { initted: true } }));
  store.dispatch(setUbereduxKey({ key: 'products', value: { initted: true } }));
  store.dispatch(setUbereduxKey({ key: 'routines', value: { initted: true } }));
  store.dispatch(setUbereduxKey({ key: 'ui', value: { initted: true } }));
  store.dispatch(setUbereduxKey({ key: 'layout', value: { initted: true } }));
  store.dispatch(setUbereduxKey({ key: 'theme', value: { initted: true } }));
}

describe('Leida routing and initialization', () => {
  beforeEach(() => {
    store.dispatch(resetUberedux());
    window.history.pushState({}, '', '/');

    initAuthMock.mockClear();
    initClientsMock.mockClear();
    initProductsMock.mockClear();
    initRoutinesMock.mockClear();
    initUIMock.mockClear();
    initLayoutMock.mockClear();
    initThemeMock.mockClear();
    setLayoutMock.mockClear();
  });

  it('dispatches bootstrap init actions once and keeps loading visible', () => {
    render(
      <Provider store={store}>
        <Leida config={{ tenant: 'free' } as any} />
      </Provider>,
    );

    expect(initAuthMock).toHaveBeenCalledTimes(1);
    expect(initClientsMock).toHaveBeenCalledTimes(1);
    expect(initProductsMock).toHaveBeenCalledTimes(1);
    expect(initRoutinesMock).toHaveBeenCalledTimes(1);
    expect(initUIMock).toHaveBeenCalledTimes(1);
    expect(initLayoutMock).toHaveBeenCalledTimes(1);
    expect(initThemeMock).toHaveBeenCalledTimes(1);
    expect(initThemeMock).toHaveBeenCalledWith({ tenant: 'free' });

    expect(setLayoutMock).toHaveBeenCalledWith('isLoading', true);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('normalizes trailing slash route and renders matching page when app is ready', () => {
    setReadyState();
    window.history.pushState({}, '', '/theme/');

    render(
      <Provider store={store}>
        <Leida config={{ tenant: 'free' } as any} />
      </Provider>,
    );

    expect(screen.getByTestId('theme-page')).toBeInTheDocument();
    expect(screen.getByTestId('header-nav-btn')).toHaveAttribute('data-path', '/theme');
    expect(setLayoutMock).toHaveBeenCalledWith('isLoading', false);
  });

  it('navigates to clients route from header callback and updates rendered route', async () => {
    const user = userEvent.setup();
    setReadyState();

    render(
      <Provider store={store}>
        <Leida config={{ tenant: 'free' } as any} />
      </Provider>,
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();

    await user.click(screen.getByTestId('header-nav-btn'));

    expect(screen.getByTestId('clients-page')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/clients');
  });
});
