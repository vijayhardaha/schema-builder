import type { WebAPI } from 'schema-dts';

import { buildId, mergeWithType, resolveUrl, validateUrl } from '@/utils';

/**
 * Options for building a Schema.org WebAPI entity.
 */
export type WebApiOptions = {
  rootUrl: string;
  name: string;
  description: string;
  path: string;
  operatingSystem?: string;
  applicationCategory?: string;
  applicationSubCategory?: string;
  version?: string;
  price?: string;
  downloadUrl?: string;
  installUrl?: string;
  requirements?: string;
  linkSourceCode?: boolean;
};

/**
 * Builds a Schema.org WebAPI structured data entity with pricing and platform details.
 *
 * @param {WebApiOptions} options - Application metadata including name, URL, and category.
 * @param {Partial<WebAPI>} [overrides] - Optional property overrides to merge into the schema.
 * @returns {WebAPI} A WebAPI schema entity with offers and authorship references.
 */
export function webApiSchema(options: WebApiOptions, overrides?: Partial<WebAPI>): WebAPI {
  const rootUrl = validateUrl(options.rootUrl);
  const canonicalUrl = resolveUrl(rootUrl, options.path);
  const orgId = buildId(rootUrl, 'organization');

  const schema: Record<string, unknown> = {
    '@type': 'WebAPI',
    '@id': buildId(canonicalUrl, 'webapi'),
    name: options.name,
    description: options.description,
    url: canonicalUrl,
    applicationCategory: options.applicationCategory || 'DeveloperApplication',
    operatingSystem: options.operatingSystem || 'All',
    softwareVersion: options.version || '1.0.0',
    isAccessibleForFree: true,
    author: { '@id': orgId },
    publisher: { '@id': orgId },
    mainEntityOfPage: { '@id': buildId(canonicalUrl, 'webpage') },
    offers: {
      '@type': 'Offer',
      price: options.price || '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  if (options.applicationSubCategory) schema.applicationSubCategory = options.applicationSubCategory;
  if (options.downloadUrl) schema.downloadUrl = options.downloadUrl;
  if (options.installUrl) schema.installUrl = options.installUrl;
  if (options.requirements) schema.softwareRequirements = options.requirements;
  if (options.linkSourceCode) schema.isBasedOn = buildId(canonicalUrl, 'source');

  return mergeWithType(schema, overrides as Record<string, unknown>) as unknown as WebAPI;
}
