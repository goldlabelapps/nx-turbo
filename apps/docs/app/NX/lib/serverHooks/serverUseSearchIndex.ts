import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getDocsContext } from '../getDocsContext';
import {
  normalizeSearchText,
  parseTags,
  stripMarkdown,
  type SearchEntry,
} from '../../Search/search-utils';

function deriveFallbackSlug(filePath: string, markdownRoot: string) {
  const relativePath = path.relative(markdownRoot, filePath).replace(/\\/g, '/');
  const withoutExtension = relativePath.replace(/\.md$/, '');
  const segments = withoutExtension.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  if (segments[segments.length - 1] === 'index') {
    segments.pop();
  }

  return `/${segments.join('/')}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
}

function walkMarkdownFiles(dir: string, markdownRoot: string, entries: SearchEntry[]) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const directoryEntries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of directoryEntries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkMarkdownFiles(absolutePath, markdownRoot, entries);
      continue;
    }

    if (!entry.name.endsWith('.md')) {
      continue;
    }

    const markdown = fs.readFileSync(absolutePath, 'utf-8');
    const { content, data } = matter(markdown);
    const slug = typeof data.slug === 'string' && data.slug.trim()
      ? data.slug.trim()
      : deriveFallbackSlug(absolutePath, markdownRoot);
    const title = typeof data.title === 'string' && data.title.trim()
      ? data.title.trim()
      : path.basename(entry.name, '.md');
    const description = typeof data.description === 'string' ? data.description.trim() : '';
    const image = typeof data.image === 'string' && data.image.trim() ? data.image.trim() : undefined;
    const tags = parseTags(data.tags);
    const bodyText = stripMarkdown(content);
    const searchText = normalizeSearchText([
      title,
      description,
      tags.join(' '),
      slug,
      bodyText,
    ].filter(Boolean).join(' '));

    entries.push({
      title,
      slug,
      href: slug,
      tags,
      description,
      image,
      bodyText,
      searchText,
    });
  }
}

export async function serverUseSearchIndex(): Promise<SearchEntry[]> {
  const { markdownDir } = getDocsContext();
  const entries: SearchEntry[] = [];
  walkMarkdownFiles(markdownDir, markdownDir, entries);

  return entries.sort((left, right) => left.title.localeCompare(right.title));
}