import { Box, Link as MuiLink, Typography } from '@mui/material';

type BreadcrumbNavItem = {
  title?: string;
  path?: string;
  children?: BreadcrumbNavItem[];
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export interface BreadcrumbProps {
  navItems?: BreadcrumbNavItem[];
  pathname?: string;
  currentLabel?: string;
  label?: string;
}

function normalizePath(path: string) {
  if (!path) return '/';
  const cleaned = path.trim();
  if (!cleaned) return '/';
  const withSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return withSlash === '/' ? '/' : withSlash.replace(/\/+$/, '');
}

function titleCaseSegment(segment: string) {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function collectPathLabels(items: BreadcrumbNavItem[], labels = new Map<string, string>()) {
  for (const item of items) {
    const path = typeof item.path === 'string' ? normalizePath(item.path) : undefined;
    if (path && item.title) {
      labels.set(path, item.title);
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
      collectPathLabels(item.children, labels);
    }
  }
  return labels;
}

function buildCrumbs({
  navItems = [],
  pathname = '/',
  currentLabel,
}: Pick<BreadcrumbProps, 'navItems' | 'pathname' | 'currentLabel'>): BreadcrumbItem[] {
  const labelsByPath = collectPathLabels(navItems);
  const normalizedPath = normalizePath(pathname || '/');

  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  if (normalizedPath === '/') {
    return currentLabel && currentLabel !== 'Home' ? [{ label: 'Home' }, { label: currentLabel }] : [{ label: 'Home' }];
  }

  const segments = normalizedPath.split('/').filter(Boolean);
  let currentPath = '';

  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    const isLast = i === segments.length - 1;
    const fallback = isLast && currentLabel ? currentLabel : titleCaseSegment(segment);
    const label = labelsByPath.get(currentPath) || fallback;

    crumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  }

  return crumbs;
}

export default function Breadcrumb({
  navItems = [],
  pathname = '/',
  currentLabel,
  label = 'Now Reading',
}: BreadcrumbProps) {
  const crumbs = buildCrumbs({ navItems, pathname, currentLabel });

  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
        gap: 1,
        alignItems: 'center',
        mb: 2,
        pb: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        component="span"
        sx={{
          justifySelf: 'start',
          display: 'inline-flex',
          alignItems: 'center',
          px: 0.8,
          py: 0.3,
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: 700,
          bgcolor: 'var(--np-color-accent)',
          color: '#fff',
        }}
      >
        {label}
      </Typography>

      <Box
        component="ol"
        sx={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 0.75,
          color: 'text.secondary',
          fontSize: '0.92rem',
          '& li': { display: 'inline-flex', alignItems: 'center' },
        }}
      >
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <MuiLink
                  href={item.href}
                  underline="hover"
                  color="inherit"
                  sx={{ fontWeight: 600 }}
                >
                  {item.label}
                </MuiLink>
              ) : (
                <Typography component="span" sx={{ fontWeight: isLast ? 700 : 600, color: isLast ? 'text.primary' : 'text.secondary' }}>
                  {item.label}
                </Typography>
              )}
              {!isLast ? (
                <Typography component="span" sx={{ mx: 0.75, color: 'text.disabled' }}>
                  /
                </Typography>
              ) : null}
            </li>
          );
        })}
      </Box>
    </Box>
  );
}
