import { validateUrl } from '@/utils/validate';

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
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A WebApplication schema entity with offers and authorship references.
 */
export function webAppSchema(options: WebAppOptions, overrides?: Record<string, unknown>): Record<string, unknown> {
  const rootUrl = validateUrl(options.rootUrl);
  const canonicalUrl = `${rootUrl}/${options.path}`.replace(/\/+$/, '').replace(/\/+/g, '/');
  const orgId = `${rootUrl}#organization`;
  const personId = `${rootUrl}#person`;

  const schema: Record<string, unknown> = {
    '@type': options.type || 'WebApplication',
    '@id': `${canonicalUrl}#app`,
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
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
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
  if (options.linkSource) schema.isBasedOn = `${canonicalUrl}#source`;

  if (overrides) {
    Object.assign(schema, overrides);
  }

  return { '@context': 'https://schema.org', ...schema };
}
