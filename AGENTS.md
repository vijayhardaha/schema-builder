# Agentic Coding Guidelines

## Project Overview

`@vijayhardaha/schema-builder` is a reusable npm package that provides Schema.org structured data utilities, types, and React components.

## Tech Stack

| Category        | Technology               |
| --------------- | ------------------------ |
| Package Manager | npm                      |
| Build Tool      | Vite                     |
| Testing         | Vitest                   |
| Linting         | ESLint                   |
| Type Safety     | TypeScript (Strict mode) |
| Formatting      | Prettier                 |
| Schema Types    | schema-dts               |
| React           | React 19                 |
| Release         | release-it               |

## Project Structure

```
src/
├── components/
│   ├── JsonLd.tsx              # React component for JSON-LD script tags
│   └── index.ts
├── constants/
│   ├── creator.ts               # CREATOR constant with profile data
│   └── index.ts
├── schemas/
│   ├── breadCrumb.ts            # + breadCrumb.test.ts
│   ├── organization.ts          # + organization.test.ts
│   ├── person.ts                # + person.test.ts
│   ├── softwareApp.ts           # + softwareApp.test.ts
│   ├── webApi.ts                # + webApi.test.ts
│   ├── webPage.ts               # webpageSchema, aboutPageSchema, contactPageSchema + webPage.test.ts
│   ├── webSite.ts               # + webSite.test.ts
│   └── index.ts
├── utils/
│   ├── merge.ts                 # SchemaEntity, deepMerge, mergeWithType + merge.test.ts
│   ├── schema.ts                # buildId, toGraph + schema.test.ts
│   ├── url.ts                   # validateUrl, resolveUrl, cleanUrl + url.test.ts
│   └── index.ts
├── index.ts                     # Main entry (re-exports schemas, constants, utils)
└── react.tsx                   # React entry (exports JsonLd component)
```

## Conventions

### Naming

- Components: `PascalCase` (`JsonLd.tsx`)
- Functions: `camelCase` (`personSchema`)
- Files: `camelCase` (`deepMerge.ts`)
- Types/Interfaces: `PascalCase` (`PersonOptions`)

### Schema Functions

Each schema function follows this pattern:

```typescript
import type { Person } from "schema-dts";

import { mergeWithType, validateUrl } from "@/utils";

export type PersonOptions = { rootUrl: string };

export function personSchema(options: PersonOptions, overrides?: Partial<Person>): Person {
  const rootUrl = validateUrl(options.rootUrl);

  const schema: Person = {
    "@type": "Person"
    // ... build schema using schema-dts types
  };

  const result = mergeWithType(
    schema as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>
  ) as unknown as Person;

  return result;
}
```

### Key Guidelines

1. **Use schema-dts types** - All schema functions should use schema-dts types for type safety
2. **Return `Record<string, unknown>`** - Functions return plain objects for flexibility
3. **Validate `rootUrl`** - Always validate with `validateUrl()` first
4. **Two parameters max** - `options` and `optional overrides`
5. **`@type` is final** - Override parameter should not change the schema type
6. **Co-locate tests** - Test files next to source files (`person.test.ts` next to `person.ts`)
7. **Types in same file** - Related types defined in the same file as their functions

## Available Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production

# Testing
npm run test         # Run tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Linting & Formatting
npm run lint         # Lint all files
npm run lint:fix     # Fix auto-fixable issues
npm run format       # Format files
npm run format:check # Check formatting

# Type Checking
npm run tsc          # TypeScript type check

# Release
npm run release      # Create a release (publishes to npm and GitHub)
npm run release:dry  # Dry run release
```

## Commit Message Format

- **Subject**: lowercase, max 50 characters
- **Body**: sentence-case or lower-case, max 72 characters per line
- Use conventional commits format (type: subject)

```
fix: standardize react types in components

- body point goes here
- body point goes here
```

## Validation

All inputs are validated:

- `rootUrl` - Must be a valid HTTP(S) URL, throws error if empty/null/undefined/invalid
- Use `validateUrl()` utility from `@/utils/url`

## Schema Types

The package provides the following schema types:

| Function             | Schema.org Type     |
| -------------------- | ------------------- |
| `personSchema`       | Person              |
| `organizationSchema` | Organization        |
| `webSiteSchema`      | WebSite             |
| `webpageSchema`      | WebPage             |
| `aboutPageSchema`    | AboutPage           |
| `contactPageSchema`  | ContactPage         |
| `webAppSchema`       | WebApplication      |
| `webApiSchema`       | WebAPI              |
| `softwareAppSchema`  | SoftwareApplication |
| `breadcrumbSchema`   | BreadcrumbList      |

## Utilities

| File        | Function          | Description                                |
| ----------- | ----------------- | ------------------------------------------ |
| `url.ts`    | `validateUrl()`   | Validates HTTP(S) URLs, throws on invalid  |
| `url.ts`    | `resolveUrl()`    | Resolves URL with path                     |
| `url.ts`    | `cleanUrl()`      | Cleans URL (trailing slash, query strings) |
| `merge.ts`  | `deepMerge()`     | Recursively merges objects                 |
| `merge.ts`  | `mergeWithType()` | Merges while preserving `@type`            |
| `merge.ts`  | `SchemaEntity`    | Type alias for `Record<string, unknown>`   |
| `schema.ts` | `toGraph()`       | Wraps entities in `@graph` structure       |
| `schema.ts` | `buildId()`       | Builds schema ID from URL and fragment     |

## React Components

### JsonLd

Renders a JSON-LD script tag with XSS protection.

```tsx
import JsonLd from "@vijayhardaha/schema-builder/react";

<JsonLd data={[personSchema(options), webSiteSchema(options)]} />;
```

## Build Configuration

The package uses Vite with multi-entry points:

- `src/index.ts` → `dist/index.js` (core utilities and schemas)
- `src/react.tsx` → `dist/react.js` (React components)

Output is ESM only with `.js` extension. Declaration files (`.d.ts`) are generated by `vite-plugin-dts` with source maps.
