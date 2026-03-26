import { webAppSchema, type WebAppOptions } from './webApplication';

/**
 * Builds a Schema.org WebAPI structured data entity for developer-facing API documentation.
 *
 * @param {Omit<WebAppOptions, 'type' | 'applicationCategory'>} options - API metadata without type or category.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A WebAPI schema entity categorized as a DeveloperApplication.
 */
export function webApiSchema(
  options: Omit<WebAppOptions, 'type' | 'applicationCategory'>,
  overrides?: Record<string, unknown>
): Record<string, unknown> {
  return webAppSchema({ ...options, type: 'WebAPI', applicationCategory: 'DeveloperApplication' }, overrides);
}
