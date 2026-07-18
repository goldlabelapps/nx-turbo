import * as React from 'react';

export type SearchEntry = {
  title: string;
  slug: string;
  href: string;
  tags: string[];
  description: string;
  image?: string;
  bodyText: string;
  searchText: string;
};

export type SearchResult = SearchEntry & {
  score: number;
  snippet: string;
  matchedField: 'title' | 'tags' | 'description' | 'body' | 'mixed';
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeSearchText(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function splitSearchTerms(query: string) {
  return normalizeSearchText(query)
    .split(' ')
    .map((term) => term.trim())
    .filter(Boolean);
}

export function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\[(?:[A-Za-z][^\]]*)\]/g, ' ')
    .replace(/[\*_~>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => parseTags(item));
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export function highlightText(text: string, query: string) {
  const terms = splitSearchTerms(query);

  if (terms.length === 0) {
    return text;
  }

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'ig');
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    if (terms.some((term) => normalizeSearchText(part).includes(term))) {
      return (
        <mark
          key={`${part}-${index}`}
          style={{
            background: 'rgba(255, 196, 0, 0.35)',
            color: 'inherit',
            borderRadius: '0.2em',
            padding: '0 0.1em',
          }}
        >
          {part}
        </mark>
      );
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

export function buildSnippet(text: string, query: string, maxLength = 180) {
  const normalizedText = text.replace(/\s+/g, ' ').trim();
  if (!normalizedText) {
    return '';
  }

  const lowerText = normalizedText.toLowerCase();
  const terms = splitSearchTerms(query);
  const primaryTerm = terms[0] || '';

  let startIndex = primaryTerm ? lowerText.indexOf(primaryTerm) : -1;
  if (startIndex < 0 && terms.length > 1) {
    for (const term of terms.slice(1)) {
      const termIndex = lowerText.indexOf(term);
      if (termIndex >= 0 && (startIndex < 0 || termIndex < startIndex)) {
        startIndex = termIndex;
      }
    }
  }

  if (startIndex < 0) {
    return normalizedText.length > maxLength
      ? `${normalizedText.slice(0, maxLength).trim()}...`
      : normalizedText;
  }

  const snippetStart = Math.max(0, startIndex - Math.floor(maxLength / 3));
  const snippetEnd = Math.min(normalizedText.length, snippetStart + maxLength);
  const snippet = normalizedText.slice(snippetStart, snippetEnd).trim();

  return `${snippetStart > 0 ? '...' : ''}${snippet}${snippetEnd < normalizedText.length ? '...' : ''}`;
}

export function filterSearchEntries(entries: SearchEntry[], query: string, limit = Infinity) {
  const terms = splitSearchTerms(query);

  if (terms.length === 0) {
    return [] as SearchResult[];
  }

  const scored = entries
    .map((entry) => {
      const title = normalizeSearchText(entry.title);
      const tags = normalizeSearchText(entry.tags.join(' '));
      const description = normalizeSearchText(entry.description || '');
      const bodyText = normalizeSearchText(entry.bodyText);
      const searchText = entry.searchText;

      const matches = terms.every((term) => searchText.includes(term));
      if (!matches) {
        return null;
      }

      let score = 0;
      let matchedField: SearchResult['matchedField'] = 'mixed';

      if (terms.every((term) => title.includes(term))) {
        score += 100;
        matchedField = 'title';
      } else if (title.includes(terms[0])) {
        score += 80;
        matchedField = 'title';
      }

      if (terms.every((term) => tags.includes(term))) {
        score += 70;
        matchedField = matchedField === 'title' ? 'mixed' : 'tags';
      } else if (terms.some((term) => tags.includes(term))) {
        score += 50;
        matchedField = matchedField === 'title' ? 'mixed' : 'tags';
      }

      if (terms.some((term) => description.includes(term))) {
        score += 30;
      }

      if (terms.some((term) => bodyText.includes(term))) {
        score += 20;
        if (matchedField === 'mixed') {
          matchedField = 'body';
        }
      }

      return {
        ...entry,
        score,
        matchedField,
        snippet: buildSnippet(entry.bodyText || entry.description || entry.title, query),
      } satisfies SearchResult;
    })
    .filter(Boolean) as SearchResult[];

  return scored
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.title.localeCompare(right.title);
    })
    .slice(0, limit);
}