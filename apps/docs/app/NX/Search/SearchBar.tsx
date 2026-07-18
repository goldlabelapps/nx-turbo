'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  ButtonBase,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { filterSearchEntries, highlightText, type SearchEntry } from './search-utils';

type SearchBarProps = {
  entries: SearchEntry[];
  compact?: boolean;
};

export default function SearchBar({ entries, compact = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const results = filterSearchEntries(entries, query, 3);
  const allResults = filterSearchEntries(entries, query);
  const hasMoreResults = query.trim().length > 0 && allResults.length > 3;

  const goToSearchPage = React.useCallback(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  }, [query, router]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      goToSearchPage();
    }

    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setQuery(nextValue);
    setOpen(nextValue.trim().length > 0);
  };

  const handleResultClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const trimmedQuery = query.trim();
  const popupWidth = compact ? 'min(960px, calc(100vw - 32px))' : '100%';

  return (
    <Box sx={{ position: 'relative', width: compact ? 260 : '100%', maxWidth: compact ? 260 : 960, mx: compact ? 0 : 'auto' }}>
      <TextField
        fullWidth={!compact}
        variant="outlined"
        size="small"
        placeholder="Search titles, tags, and body text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (trimmedQuery) {
            setOpen(true);
          }
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{
          background: 'background.paper',
          borderRadius: 999,
          minWidth: compact ? 260 : undefined,
          '& .MuiOutlinedInput-root': {
            borderRadius: 999,
          },
        }}
      />

      {open && trimmedQuery && results.length > 0 ? (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            width: popupWidth,
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 20,
            overflow: 'hidden',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack divider={<Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />}>
            {results.map((result) => (
              <ButtonBase
                key={result.href}
                component={Link}
                href={result.href}
                onMouseDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.preventDefault();
                  handleResultClick(result.href);
                }}
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  p: 1.5,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  {result.image ? (
                    <Box
                      component="img"
                      src={result.image}
                      alt={result.title}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                        background: 'linear-gradient(180deg, rgba(245,247,250,1) 0%, rgba(232,236,242,1) 100%)',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <SearchOutlinedIcon fontSize="small" />
                    </Box>
                  )}

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {highlightText(result.title, query)}
                    </Typography>
                    {result.description ? (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                        {highlightText(result.description, query)}
                      </Typography>
                    ) : null}
                    {result.snippet ? (
                      <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                        {highlightText(result.snippet, query)}
                      </Typography>
                    ) : null}
                  </Box>
                </Stack>
              </ButtonBase>
            ))}

            {hasMoreResults ? (
              <Button
                component={Link}
                href={`/search?q=${encodeURIComponent(trimmedQuery)}`}
                fullWidth
                color="inherit"
                sx={{
                  justifyContent: 'space-between',
                  borderRadius: 0,
                  py: 1.25,
                  px: 2,
                  textTransform: 'none',
                }}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setOpen(false)}
              >
                <span>More results</span>
                <span>{allResults.length}</span>
              </Button>
            ) : null}
          </Stack>
        </Paper>
      ) : null}
    </Box>
  );
}