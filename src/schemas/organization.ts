import type { Organization } from 'schema-dts';

import { validateUrl } from '@/utils/validate';

/** Options for building a Schema.org Organization entity. */
export type OrganizationOptions = { rootUrl: string };

/**
 * Builds a Schema.org Organization structured data entity linked to the site creator.
 *
 * @param {OrganizationOptions} options - The root URL for generating organization identifiers.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns An Organization schema entity with logo and founder references.
 */
export function organizationSchema(
  options: OrganizationOptions,
  overrides?: Record<string, unknown>
): Record<string, unknown> {
  const rootUrl = validateUrl(options.rootUrl);
  const personId = `${rootUrl}#person`;
  const orgId = `${rootUrl}#organization`;

  const schema: Organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: 'Your Name or Organization',
    description: 'A brief description of your organization.',
    url: rootUrl,
    logo: { '@type': 'ImageObject', url: `${rootUrl}/logo.png`, width: '512', height: '512' },
    founder: { '@id': personId },
    foundingDate: new Date().getFullYear().toString(),
    sameAs: [],
  };

  if (overrides) {
    Object.assign(schema, overrides);
  }

  return { ...schema };
}
