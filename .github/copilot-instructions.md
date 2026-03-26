# Copilot Instructions

You are an AI assistant helping with the `@vijayhardaha/schema-builder` npm package. This package provides Schema.org structured data utilities with type safety using schema-dts.

## What this package does

Generates Schema.org JSON-LD structured data for SEO purposes. Used by websites to provide search engines with machine-readable information about people, organizations, websites, web pages, applications, and more.

## Key patterns to follow

### Schema function signature

```typescript
import type { SomeType } from 'schema-dts';

export type SomeOptions = { rootUrl: string; /* other required options */ };

export function someSchema(
  options: SomeOptions,
  overrides?: Partial<SomeType>
): Record<string, unknown> {
  // 1. Validate rootUrl first
  const rootUrl = validateUrl(options.rootUrl);

  // 2. Build schema using schema-dts types
  const schema: SomeType = { '@type': 'SomeType', ... };

  // 3. Apply overrides if provided
  if (overrides) {
    Object.assign(schema, overrides);
  }

  // 4. Return with @context
  return { '@context': 'https://schema.org', ...schema };
}
```

### Important rules

1. **Always validate `rootUrl`** using `validateUrl()` from `@/utils/url` - it throws on invalid input
2. **Use schema-dts types** - Import types from `schema-dts` for type safety
3. **Return `Record<string, unknown>`** - Not `WithContext<T>` from schema-dts
4. **Keep `@type` final** - The override parameter should not be able to change the schema type
5. **Maximum two parameters** - `options` (required) and `overrides` (optional)
6. **Test files go next to source** - `person.test.ts` beside `person.ts`
7. **Types in same file** - Options types defined in same file as the function

### File naming

- Use camelCase for all file names: `merge.ts`, `person.ts`
- Don't use hyphens or underscores

### JSDoc requirements

Add JSDoc to:

- All exported functions
- All exported types
- Complex utility functions

Skip JSDoc for:

- Obvious props (`className`, `children`)
- Simple type aliases

## Available commands

```bash
npm run test         # Run tests
npm run lint         # Lint files
npm run tsc          # Type check
npm run build        # Build package
npm run release      # Create release (npm + GitHub)
npm run release:dry  # Dry run release
```

## Don't

- Don't return schema-dts types directly from functions
- Don't skip `rootUrl` validation
- Don't use `any` type - use `unknown` if uncertain
- Don't add unnecessary comments
- Don't create separate files for related schemas (e.g., aboutPage and contactPage can be in webpage.ts)

## Project files

- `LICENSE` - MIT License (Vijay Hardaha)
- `README.md` - Project documentation
