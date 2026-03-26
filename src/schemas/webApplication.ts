import type { WebApplication } from 'schema-dts';

import { buildId, mergeWithType, resolveUrl, validateUrl } from '@/utils';

/**
 * Options for building a Schema.org WebApplication or related software entity.
 */
export type WebAppOptions = {
  rootUrl: string;
  name: string;
  description: string;
  path: string;
  type?: string;
  operatingSystem?: string;
  applicationCategory?: string;
  applicationSubCategory?: string;
  version?: string;
  price?: string;
  downloadUrl?: string;
  installUrl?: string;
  requirements?: string;
  linkSource?: boolean;
};

/**
 * Builds a Schema.org WebApplication structured data entity with pricing and platform details.
 *
 * @param {WebAppOptions} options - Application metadata including name, URL, and category.
 * @param {Partial<WebApplication>} [overrides] - Optional property overrides to merge into the schema.
 * @returns {WebApplication} A WebApplication schema entity with offers and authorship references.
 */
export function webAppSchema(options: WebAppOptions, overrides?: Partial<WebApplication>): WebApplication {
  const rootUrl = validateUrl(options.rootUrl);
  const canonicalUrl = resolveUrl(rootUrl, options.path);
  const orgId = buildId(rootUrl, 'organization');
  const personId = buildId(rootUrl, 'person');

  const schema: Record<string, unknown> = {
    '@type': options.type || 'WebApplication',
    '@id': buildId(canonicalUrl, 'app'),
    name: options.name,
    description: options.description,
    url: canonicalUrl,
    applicationCategory: options.applicationCategory || 'DeveloperApplication',
    operatingSystem: options.operatingSystem || 'All',
    softwareVersion: options.version || '1.0.0',
    isAccessibleForFree: true,
    author: { '@id': personId },
    creator: { '@id': personId },
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
  if (options.linkSource) schema.isBasedOn = buildId(canonicalUrl, 'source');

  return mergeWithType(schema, overrides as Record<string, unknown>) as unknown as WebApplication;
}
