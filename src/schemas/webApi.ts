import type { WebAPI } from 'schema-dts';

import { webAppSchema, type WebAppOptions } from './webApplication';

/**
 * Builds a Schema.org WebAPI structured data entity for developer-facing API documentation.
 *
 * @param {Omit<WebAppOptions, 'type' | 'applicationCategory'>} options - API metadata without type or category.
 * @param {Partial<WebAPI>} [overrides] - Optional property overrides to merge into the schema.
 * @returns {WebAPI} A WebAPI schema entity categorized as a DeveloperApplication.
 */
export function webApiSchema(
  options: Omit<WebAppOptions, 'type' | 'applicationCategory'>,
  overrides?: Partial<WebAPI>
): WebAPI {
  return webAppSchema(
    { ...options, type: 'WebAPI', applicationCategory: 'DeveloperApplication' },
    overrides as Record<string, unknown>
  ) as unknown as WebAPI;
}
