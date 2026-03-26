import type { SoftwareSourceCode } from 'schema-dts';

import { validateUrl } from '@/utils/validate';

/**
 * Options for building a Schema.org SoftwareSourceCode entity with repository metadata.
 */
export type SoftwareSourceOptions = {
  rootUrl: string;
  name: string;
  description: string;
  path: string;
  version?: string;
  repositoryUrl?: string;
  installUrl?: string;
  programmingLanguage?: string;
  runtimePlatform?: string;
  keywords?: string[];
};

/**
 * Builds a Schema.org SoftwareSourceCode structured data entity for open-source projects.
 *
 * @param {SoftwareSourceOptions} options - Source code metadata including language, version, and repository URL.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A SoftwareSourceCode schema entity with authorship and licensing details.
 */
export function softwareSourceCodeSchema(
  options: SoftwareSourceOptions,
  overrides?: Record<string, unknown>
): Record<string, unknown> {
  const rootUrl = validateUrl(options.rootUrl);
  const canonicalUrl = `${rootUrl}/${options.path}`.replace(/\/+$/, '').replace(/\/+/g, '/');
  const personId = `${rootUrl}#person`;
  const orgId = `${rootUrl}#organization`;

  const schema: SoftwareSourceCode = {
    '@type': 'SoftwareSourceCode',
    '@id': `${canonicalUrl}#sourcecode`,
    name: options.name,
    description: options.description,
    url: options.installUrl || canonicalUrl,
    programmingLanguage: { '@type': 'ComputerLanguage', name: options.programmingLanguage || 'TypeScript' },
    runtimePlatform: options.runtimePlatform || 'Node.js',
    version: options.version || '1.0.0',
    codeRepository: options.repositoryUrl || '',
    keywords: Array.isArray(options.keywords) ? options.keywords.join(', ') : options.keywords || '',
    license: 'https://opensource.org/licenses/MIT',
    author: { '@id': personId },
    publisher: { '@id': orgId },
    maintainer: { '@id': personId },
    copyrightHolder: { '@id': orgId },
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
  };

  if (overrides) {
    Object.assign(schema, overrides);
  }

  return { '@context': 'https://schema.org', ...schema };
}
