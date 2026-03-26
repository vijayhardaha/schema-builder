# Agentic Coding Guidelines

## Project Overview

`@vijayhardaha/schema` is a reusable npm package that provides Schema.org structured data utilities, types, and React components.

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

## Project Structure

```
schema/
├── src/
│   ├── components/
│   │   └── JsonLd.tsx          # React component for JSON-LD script tags
│   ├── constants/
│   │   ├── creator.ts           # CREATOR constant with profile data
│   │   └── index.ts
│   ├── schemas/
│   │   ├── person.ts           # + person.test.ts
│   │   ├── organization.ts    # + organization.test.ts
│   │   ├── website.ts         # + website.test.ts
│   │   ├── webpage.ts         # webpageSchema, aboutPageSchema, contactPageSchema + tests
│   │   ├── webApplication.ts  # + webApplication.test.ts
│   │   ├── webApi.ts
│   │   ├── softwareApplication.ts
│   │   ├── softwareSourceCode.ts  # + softwareSourceCode.test.ts
│   │   ├── breadcrumbList.ts     # + breadcrumbList.test.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── deepMerge.ts       # SchemaEntity type, deepMerge, mergeWithType + tests
│   │   ├── validate.ts        # validateUrl + tests
│   │   └── index.ts
│   ├── index.ts              # Main entry
│   └── react.tsx             # React entry (includes JsonLd)
├── LICENSE                   # MIT License
├── README.md                 # Project documentation
├── vitest.setup.ts
├── vitest.config.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.build.json
├── eslint.config.mjs
├── prettier.config.mjs
├── commitlint.config.mjs
├── jsconfig.json
├── .editorconfig
└── package.json
```

## Conventions

### Naming

- Components: `PascalCase` (`Button.tsx`)
- Functions: `camelCase` (`personSchema`)
- Files: `camelCase` (`deepMerge.ts`)
- Types/Interfaces: `PascalCase` (`PersonOptions`)

### Schema Functions

Each schema function follows this pattern:

```typescript
import type { Person } from "schema-dts";

export type SchemaOptions = { rootUrl: string /* other options */ };

export function schemaFunction(options: SchemaOptions, overrides?: Partial<Person>): Record<string, unknown> {
  const rootUrl = validateUrl(options.rootUrl);
  // ... build schema using schema-dts types
  return { "@context": "https://schema.org", ...schema };
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
npm run format        # Format files
npm run format:check # Check formatting

# Type Checking
npm run tsc          # TypeScript type check
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
- Use `validateUrl()` utility from `@/utils/validate`

## Schema Types

The package provides the following schema types:

- `personSchema` - Schema.org Person entity
- `organizationSchema` - Schema.org Organization entity
- `websiteSchema` - Schema.org WebSite entity
- `webpageSchema` - Schema.org WebPage entity
- `aboutPageSchema` - Schema.org AboutPage entity
- `contactPageSchema` - Schema.org ContactPage entity
- `webAppSchema` - Schema.org WebApplication entity
- `webApiSchema` - Schema.org WebAPI entity
- `softwareApplicationSchema` - Schema.org SoftwareApplication entity
- `softwareSourceCodeSchema` - Schema.org SoftwareSourceCode entity
- `breadcrumbSchema` - Schema.org BreadcrumbList entity

## Utilities

| File           | Function          | Description                               |
| -------------- | ----------------- | ----------------------------------------- |
| `validate.ts`  | `validateUrl()`   | Validates HTTP(S) URLs, throws on invalid |
| `deepMerge.ts` | `deepMerge()`     | Recursively merges objects                |
| `deepMerge.ts` | `mergeWithType()` | Merges while preserving `@type`           |
| `deepMerge.ts` | `SchemaEntity`    | Type alias for `Record<string, unknown>`  |
| `schemaDts.ts` | `toGraph()`       | Wraps entities in `@graph` structure      |

## React Components

### JsonLd

Renders a JSON-LD script tag with XSS protection.

```tsx
import JsonLd from "@vijayhardaha/schema/react";

<JsonLd data={[personSchema(options), websiteSchema(options)]} />;
```
