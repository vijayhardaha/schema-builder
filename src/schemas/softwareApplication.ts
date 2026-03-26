import type { SoftwareApplication } from 'schema-dts';

import { webAppSchema, type WebAppOptions } from './webApplication';

/**
 * Builds a Schema.org SoftwareApplication entity categorized as a utility application.
 *
 * @param {Omit<WebAppOptions, 'type' | 'applicationCategory'>} options - Application metadata without type or category.
 * @param {Partial<SoftwareApplication>} [overrides] - Optional property overrides to merge into the schema.
 * @returns {SoftwareApplication} A SoftwareApplication schema entity derived from the WebApplication builder.
 */
export function softwareApplicationSchema(
  options: Omit<WebAppOptions, 'type' | 'applicationCategory'>,
  overrides?: Partial<SoftwareApplication>
): SoftwareApplication {
  return webAppSchema(
    { ...options, type: 'SoftwareApplication', applicationCategory: 'UtilityApplication' },
    overrides as Record<string, unknown>
  ) as unknown as SoftwareApplication;
}
