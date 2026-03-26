import type { BreadcrumbList, ListItem } from 'schema-dts';

import { validateUrl } from '@/utils/validate';

/** A single breadcrumb navigation item with display name and URL path. */
export type BreadcrumbItem = { name: string; path: string };

/** Options for building a Schema.org BreadcrumbList entity from navigation items. */
export type BreadcrumbOptions = { rootUrl: string; items: BreadcrumbItem[] };

/**
 * Builds a Schema.org BreadcrumbList structured data entity from navigation items.
 *
 * @param {BreadcrumbOptions} options - The root URL and ordered breadcrumb items.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A BreadcrumbList schema entity with positioned list items.
 */
export function breadcrumbSchema(
  options: BreadcrumbOptions,
  overrides?: Record<string, unknown>
): Record<string, unknown> {
  const rootUrl = validateUrl(options.rootUrl);
  const { items } = options;
  const lastItem = items[items.length - 1];
  const breadcrumbUrl = lastItem ? `${rootUrl}/${lastItem.path}` : rootUrl;
  const canonicalUrl = breadcrumbUrl.replace(/\/+$/, '').replace(/\/+/g, '/');

  const schema: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map<ListItem>((item, index) => {
      const url = `${rootUrl}/${item.path}`.replace(/\/+$/, '').replace(/\/+/g, '/');

      return {
        '@type': 'ListItem',
        '@id': `${url}#listitem`,
        position: index + 1,
        name: item.name,
        item: { '@type': 'Thing', '@id': url, name: item.name },
      } satisfies ListItem;
    }),
  };

  if (overrides) {
    Object.assign(schema, overrides);
  }

  return { '@context': 'https://schema.org', ...schema };
}
