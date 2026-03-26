/**
 * Wraps entities in a @graph structure for multiple schemas.
 * Used when you need to return multiple interconnected schemas.
 */
export function toGraph(...entities: Record<string, unknown>[]): Record<string, unknown> {
  return { '@context': 'https://schema.org', '@graph': entities };
}
