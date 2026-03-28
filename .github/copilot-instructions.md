# Copilot Instructions

You are an AI assistant helping with the `@vijayhardaha/schema-builder` npm package. This package provides Schema.org structured data utilities with type safety using schema-dts.

## What this package does

Generates Schema.org JSON-LD structured data for SEO purposes. Used by websites to provide search engines with machine-readable information about people, organizations, websites, web pages, applications, and more.

## Key patterns to follow

### Schema function signature

```typescript
import type { SomeType } from 'schema-dts';

import { mergeWithType, validateUrl } from '@/utils';

export type SomeOptions = { rootUrl: string; /* other required options */ };

export function someSchema(
  options: SomeOptions,
  overrides?: Partial<SomeType>
): SomeType {
  // 1. Validate rootUrl first
  const rootUrl = validateUrl(options.rootUrl);

  // 2. Build schema using schema-dts types
  const schema: SomeType = { '@type': 'SomeType', ... };

  // 3. Apply overrides using mergeWithType (preserves @type)
  const result = mergeWithType(
    schema as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>
  ) as unknown as SomeType;

  return result;
}
```

### Important rules

1. **Always validate `rootUrl`** using `validateUrl()` from `@/utils/url` - it throws on invalid input
2. **Use schema-dts types** - Import types from `schema-dts` for type safety
3. **Use `mergeWithType()`** - For merging overrides while preserving `@type`
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

- Don't skip `rootUrl` validation
- Don't use `any` type - use `unknown` if uncertain
- Don't add unnecessary comments
- Don't add redundant cleanup code (deepMerge already handles undefined values)

## Project files

- `LICENSE` - MIT License (Vijay Hardaha)
- `README.md` - Project documentation
