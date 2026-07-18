import type { Metadata } from 'next';
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { getDocsContext, getMeta, serverUseSearchIndex } from '../NX/lib/index.server';
import {
  filterSearchEntries,
  highlightText,
  type SearchResult,
} from '../NX/Search/search-utils';

type SearchParams = {
  q?: string | string[];
};

type SearchPageProps = {
  searchParams?: Promise<SearchParams>;
};

async function resolveSearchParams(searchParams?: Promise<SearchParams>) {
  return (await searchParams) ?? {};
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await resolveSearchParams(searchParams);
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q.trim() : '';
  const { config } = getDocsContext();
  const baseUrl = (config.url || '').replace(/\/$/, '');

  return getMeta({
    siteName: config.siteName,
    title: query ? `Search: ${query}` : 'Search',
    description: query ? `Search results for ${query}` : config.description,
    image: config.images?.light || config.images?.dark,
    url: `${baseUrl}/search${query ? `?q=${encodeURIComponent(query)}` : ''}`,
  });
}

function SearchResultCard({ result, query }: { result: SearchResult; query: string }) {
  return (
    <Paper
      component="a"
      href={result.href}
      variant="outlined"
      sx={{
        overflow: 'hidden',
        borderRadius: 3,
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: 'text.primary',
        },
      }}
    >
      {result.image ? (
        <Box
          component="img"
          src={result.image}
          alt={result.title}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
      ) : null}

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {highlightText(result.title, query)}
        </Typography>

        {result.description ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {highlightText(result.description, query)}
          </Typography>
        ) : null}

        {result.snippet ? (
          <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
            {highlightText(result.snippet, query)}
          </Typography>
        ) : null}

        {result.tags.length > 0 ? (
          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" sx={{ mt: 1.5 }}>
            {result.tags.slice(0, 6).map((tag) => (
              <Chip key={tag} label={highlightText(tag, query)} size="small" variant="outlined" />
            ))}
          </Stack>
        ) : null}
      </Box>
    </Paper>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await resolveSearchParams(searchParams);
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q.trim() : '';
  const entries = await serverUseSearchIndex();
  const results = query ? filterSearchEntries(entries, query) : [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography component="h1" variant="h3" sx={{ fontWeight: 400, lineHeight: 1.05 }}>
          Search
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '72ch' }}>
          {query
            ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query}”.`
            : 'Use the search field to find matches across titles, tags, and body text.'}
        </Typography>
      </Box>

      {query ? (
        results.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              alignItems: 'start',
            }}
          >
            {results.map((result) => (
              <SearchResultCard key={result.href} result={result} query={query} />
            ))}
          </Box>
        ) : (
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              No matches found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try a different title, tag, or phrase from the body text.
            </Typography>
          </Paper>
        )
      ) : (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Start typing in the search field above
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Results will appear as cards once you run a search.
          </Typography>
        </Paper>
      )}
    </Container>
  );
}