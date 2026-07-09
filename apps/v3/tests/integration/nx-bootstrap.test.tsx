import * as React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store, resetUberedux, setUbereduxKey } from '@/app/NX/Uberedux/store';

/* eslint-disable no-var */
var setDesignSystemMock: jest.Mock;
/* eslint-enable no-var */

jest.mock('@/app/NX/DesignSystem', () => {
  const ReactLocal = require('react');
  const { useSelector } = require('react-redux');
  const EMPTY_DESIGN_SYSTEM = Object.freeze({});
  setDesignSystemMock = jest.fn((key: string, value: unknown) => ({
    type: 'TEST_SET_DESIGN_SYSTEM',
    payload: { key, value },
  }));

  return {
    __esModule: true,
    DesignSystem: ({ children, theme }: { children: React.ReactNode; theme: { mode?: string } }) =>
      ReactLocal.createElement(
        'div',
        {
          'data-testid': 'design-system',
          'data-mode': theme?.mode,
        },
        children,
      ),
    Feedback: () => ReactLocal.createElement('div', { 'data-testid': 'feedback' }, 'Feedback'),
    useDesignSystem: () => useSelector((state: any) => state?.redux?.designSystem ?? EMPTY_DESIGN_SYSTEM),
    setDesignSystem: setDesignSystemMock,
  };
});

import { NXProvider as NX } from '@/app/NX';

const validConfig = {
  cartridges: {
    designSystem: {
      defaultTheme: 'light',
      themeSwitching: true,
      themes: {
        light: { palette: { background: '#fff' } },
        dark: { palette: { background: '#000' } },
      },
    },
  },
};

describe('NX bootstrap and config handling', () => {
  beforeEach(() => {
    store.dispatch(resetUberedux());
    setDesignSystemMock.mockClear();
  });

  it('initializes designSystem theme defaults when store has no themeMode', () => {
    render(
      <Provider store={store}>
        <NX config={validConfig as any}>
          <div data-testid="child-node">Child</div>
        </NX>
      </Provider>,
    );

    expect(setDesignSystemMock).toHaveBeenCalledWith('themeMode', 'light');
    expect(setDesignSystemMock).toHaveBeenCalledWith('themeSwitching', true);
  });

  it('does not re-initialize themeMode when store already has one', () => {
    store.dispatch(
      setUbereduxKey({
        key: 'designSystem',
        value: {
          themeMode: 'dark',
        },
      }),
    );

    render(
      <Provider store={store}>
        <NX config={validConfig as any}>
          <div data-testid="child-node">Child</div>
        </NX>
      </Provider>,
    );

    expect(setDesignSystemMock).not.toHaveBeenCalledWith('themeMode', 'light');
    expect(screen.getByTestId('design-system')).toHaveAttribute('data-mode', 'dark');
    expect(screen.getByTestId('feedback')).toBeInTheDocument();
    expect(screen.getByTestId('child-node')).toBeInTheDocument();
  });

  it('renders invalid-config fallback and still renders children', () => {
    render(
      <Provider store={store}>
        <NX config={{} as any}>
          <div data-testid="child-node">Child</div>
        </NX>
      </Provider>,
    );

    expect(screen.getByText('Error: Invalid or missing config.json')).toBeInTheDocument();
    expect(screen.getByTestId('child-node')).toBeInTheDocument();
  });
});
