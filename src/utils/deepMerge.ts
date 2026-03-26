/**
 * Represents a generic JSON-LD schema entity with string keys and unknown values.
 */
export type SchemaEntity = Record<string, unknown>;

/**
 * Recursively merges override properties into a base schema entity.
 *
 * @param {SchemaEntity} base - The base schema entity to merge into.
 * @param {SchemaEntity | undefined} overrides - The override properties to apply.
 * @returns A new schema entity with deeply merged properties.
 *
 * @example
 * deepMerge({ name: 'Test' }, { url: 'https://example.com' });
 * // { name: 'Test', url: 'https://example.com' }
 */
export function deepMerge(base: SchemaEntity, overrides: SchemaEntity | undefined): SchemaEntity {
  if (!overrides) return base;

  const result: SchemaEntity = { ...base };

  for (const key in overrides) {
    const overrideValue = overrides[key];

    // Skip undefined values to preserve the base property.
    if (overrideValue === undefined) continue;

    const baseValue = base[key];

    // Recursively merge nested objects; arrays and primitives are replaced.
    if (
      baseValue !== null
      && typeof baseValue === 'object'
      && !Array.isArray(baseValue)
      && baseValue !== undefined
      && overrideValue !== null
      && typeof overrideValue === 'object'
      && !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue as SchemaEntity, overrideValue as SchemaEntity);
    } else {
      result[key] = overrideValue;
    }
  }

  return result;
}

/**
 * Merges overrides into a schema while preserving the original `@type` value.
 *
 * @param {SchemaEntity} schema - The base schema entity containing the `@type` to preserve.
 * @param {SchemaEntity} [overrides] - Optional override properties to merge.
 * @returns A merged schema entity with the original `@type` intact.
 */
export function mergeWithType(schema: SchemaEntity, overrides?: SchemaEntity): SchemaEntity {
  const merged = deepMerge(schema, overrides);

  // Restore the original @type to prevent overrides from changing the schema type.
  const typeValue = schema['@type'];

  if (typeValue !== undefined) {
    merged['@type'] = typeValue;
  }

  return merged;
}
