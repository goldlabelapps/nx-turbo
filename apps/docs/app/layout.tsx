import "./globals.css";
import "@nx/design-system/styles";
import type { Metadata } from "next";
import config from '../public/config.json';
import { getDocsContext } from './NX/lib/index.server';
import { UbereduxProvider } from './NX/Uberedux';
import RequireAuthWrapper from './NX/Paywall/components/RequireAuthWrapper';

const { manifestPath } = getDocsContext();
const { siteName, description, favicon } = config;
const configuredDesignSystem = config?.cartridges?.designSystem?.system;
const designSystemId = typeof configuredDesignSystem === 'string' && configuredDesignSystem.trim()
  ? configuredDesignSystem.trim()
  : 'nx';

export const metadata: Metadata = {
  title: `${siteName}, ${description}`,
  description,
  icons: {
    icon: favicon,
    shortcut: favicon,
    apple: favicon,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const paywall = config.cartridges?.paywall?.enabled === true;

  return (
    <html lang="en" data-design-system={designSystemId}>
      <head>
        <link rel="icon" href={favicon} />
        <link rel="manifest" href={manifestPath} />
        <meta name="application-name" content={siteName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          <UbereduxProvider config={config}>
            {paywall ? (
              <RequireAuthWrapper config={config}>{children}</RequireAuthWrapper>
            ) : (
              children
            )}
          </UbereduxProvider>
        </div>
      </body>
    </html>
  );
}
