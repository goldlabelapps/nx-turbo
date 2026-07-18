import "./globals.css";
import "@nx/design-system/styles";
import "@nx/newspaper/styles";
import type { Metadata } from "next";
import { NewspaperShell } from "@nx/newspaper";
import type { MastheadMenuItem } from "@nx/newspaper";
import config from '../public/config.json';
import { getDocsContext, serverUseNav, serverUseSearchIndex } from './NX/lib/index.server';
import { UbereduxProvider } from './NX/Uberedux';
import RequireAuthWrapper from './NX/Paywall/components/RequireAuthWrapper';
import { NewspaperMasthead } from './NX/DesignSystem/components/NewspaperMasthead';
import SearchBar from './NX/Search/SearchBar';

const { manifestPath } = getDocsContext();
const { siteName, description, favicon } = config;
const metadataBase = (() => {
  try {
    return new URL(config.url);
  } catch {
    return new URL('http://localhost:3000');
  }
})();
const configuredDesignSystem = config?.cartridges?.designSystem?.system;
const designSystemId = typeof configuredDesignSystem === 'string' && configuredDesignSystem.trim()
  ? configuredDesignSystem.trim()
  : 'nx';

type RawNavItem = {
  title?: string;
  path?: string;
  hideInNav?: boolean | string;
  children?: RawNavItem[];
};

function isVisibleNavItem(item: RawNavItem) {
  return !(item.hideInNav === true || item.hideInNav === "true");
}

function toMastheadMenu(items: RawNavItem[]): MastheadMenuItem[] {
  return items
    .filter(isVisibleNavItem)
    .map((item) => {
      const href = typeof item.path === "string" && item.path.trim() ? item.path : "/";
      const label = href === "/" ? "Home" : item.title || "Untitled";
      const childItems = Array.isArray(item.children)
        ? toMastheadMenu(item.children).filter((child) => child.href !== href)
        : [];

      return {
        label,
        href,
        children: childItems.length > 0 ? childItems : undefined,
      };
    });
}

export const metadata: Metadata = {
  metadataBase,
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
  const navItems = await serverUseNav();
  const searchEntries = await serverUseSearchIndex();
  const mastheadMenu = toMastheadMenu(navItems as RawNavItem[]);
  const utilityStart = <SearchBar entries={searchEntries} compact />;

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
        <NewspaperShell>
          <NewspaperMasthead
            title={siteName}
            strapline={description}
            menuItems={mastheadMenu}
            utilityStart={utilityStart}
            utilityLinks={[{ label: "Home", href: "/" }]}
          />
          <div className="wrapper">
            <UbereduxProvider config={config}>
              {paywall ? <RequireAuthWrapper config={config}>{children}</RequireAuthWrapper> : children}
            </UbereduxProvider>
          </div>
        </NewspaperShell>
      </body>
    </html>
  );
}
