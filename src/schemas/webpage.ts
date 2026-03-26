import type { AboutPage, ContactPage, WebPage } from 'schema-dts';

import { validateUrl } from '@/utils/validate';

/**
 * Options for building a Schema.org WebPage entity with routing and type information.
 */
export type WebPageOptions = {
  rootUrl: string;
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage';
  breadcrumbId?: string;
  mainEntityId?: string;
};

function buildWebPageSchema(options: WebPageOptions, overrides?: Record<string, unknown>): WebPage {
  const rootUrl = validateUrl(options.rootUrl);
  const canonicalUrl = `${rootUrl}/${options.path}`.replace(/\/+$/, '').replace(/\/+/g, '/');
  const personId = `${rootUrl}#person`;
  const orgId = `${rootUrl}#organization`;
  const webSiteID = `${rootUrl}#website`;

  const schema: WebPage = {
    '@type': options.type || 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: 'Your Page Name',
    description: 'A brief description of this page.',
    inLanguage: 'en',

    isPartOf: { '@id': webSiteID },
    publisher: { '@id': orgId },
    author: { '@id': personId },
    copyrightHolder: { '@id': personId },

    copyrightYear: new Date().getFullYear(),
    dateModified: new Date().toISOString(),

    image: { '@type': 'ImageObject', url: `${canonicalUrl}/preview.png`, width: '1200', height: '630' },
  };

  if (options.mainEntityId) {
    schema.mainEntity = { '@id': options.mainEntityId };
  }

  if (options.breadcrumbId) {
    schema.breadcrumb = { '@id': options.breadcrumbId };
  }

  const safeOverrides = overrides || {};
  return { ...schema, ...safeOverrides };
}

/**
 * Builds a Schema.org WebPage structured data entity for a specific page.
 *
 * @param {WebPageOptions} options - Page metadata including URL, name, and type.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A WebPage schema entity linked to the site, author, and publisher.
 */
export function webpageSchema(options: WebPageOptions, overrides?: Record<string, unknown>): WebPage {
  const schema = buildWebPageSchema(options, overrides);
  return { ...schema };
}

/**
 * Builds a Schema.org AboutPage structured data entity.
 *
 * @param {WebPageOptions} options - Page metadata including URL, name, and description.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns An AboutPage schema entity.
 */
export function aboutPageSchema(options: WebPageOptions, overrides?: Record<string, unknown>): AboutPage {
  const schema = buildWebPageSchema({ ...options, type: 'AboutPage' }, overrides) as AboutPage;
  return { ...schema };
}

/**
 * Builds a Schema.org ContactPage structured data entity.
 *
 * @param {WebPageOptions} options - Page metadata including URL, name, and description.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A ContactPage schema entity.
 */
export function contactPageSchema(options: WebPageOptions, overrides?: Record<string, unknown>): ContactPage {
  const schema = buildWebPageSchema({ ...options, type: 'ContactPage' }, overrides) as ContactPage;
  return { ...schema };
}
