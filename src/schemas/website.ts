import type { WebSite } from 'schema-dts';

import { validateUrl } from '@/utils/validate';

/** Options for building a Schema.org WebSite entity with optional main entity reference. */
export type WebSiteOptions = { rootUrl: string; mainEntityId?: string };

/**
 * Builds a Schema.org WebSite structured data entity for the site root.
 *
 * @param {WebSiteOptions} options - The root URL and optional main entity reference.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A WebSite schema entity with author and language metadata.
 */
export function websiteSchema(options: WebSiteOptions, overrides?: Record<string, unknown>): Record<string, unknown> {
  const rootUrl = validateUrl(options.rootUrl);
  const personId = `${rootUrl}#person`;

  const schema: WebSite = {
    '@type': 'WebSite',
    '@id': `${rootUrl}#website`,
    name: (overrides?.name as string) || rootUrl,
    url: rootUrl,
    description: (overrides?.description as string) || '',
    inLanguage: 'en',
    author: { '@id': personId },
  };

  if (options.mainEntityId) {
    schema.mainEntity = { '@id': options.mainEntityId };
  }

  if (overrides) {
    Object.assign(schema, overrides);
  }

  return { '@context': 'https://schema.org', ...schema };
}
