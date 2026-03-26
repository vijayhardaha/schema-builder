import { webAppSchema, type WebAppOptions } from './webApplication';

/**
 * Builds a Schema.org SoftwareApplication entity categorized as a utility application.
 *
 * @param {Omit<WebAppOptions, 'type' | 'applicationCategory'>} options - Application metadata without type or category.
 * @param {Record<string, unknown>} [overrides] - Optional property overrides to merge into the schema.
 * @returns A SoftwareApplication schema entity derived from the WebApplication builder.
 */
export function softwareApplicationSchema(
  options: Omit<WebAppOptions, 'type' | 'applicationCategory'>,
  overrides?: Record<string, unknown>
): Record<string, unknown> {
  return webAppSchema(
    { ...options, type: 'SoftwareApplication', applicationCategory: 'UtilityApplication' },
    overrides
  );
}
