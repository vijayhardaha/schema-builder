# @vijayhardaha/schema

Reusable Schema.org structured data utilities, types, and React components with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/@vijayhardaha/schema.svg)](https://www.npmjs.com/package/@vijayhardaha/schema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Note:** This package is primarily for the author's personal use. However, you're free to use or fork it for your own projects. The `personSchema` function includes the author's personal details by default - make sure to override these with your own information when using this package.

## Features

- Full TypeScript support with strict mode
- Type-safe Schema.org types using [schema-dts](https://github.com/google/schema-dts)
- React components for JSON-LD script tags
- Utility functions for merging and validating schemas
- Comprehensive test coverage

## Installation

```bash
bun add @vijayhardaha/schema
```

or

```bash
npm install @vijayhardaha/schema
```

or

```bash
pnpm add @vijayhardaha/schema
```

or

```bash
yarn add @vijayhardaha/schema
```

## Usage

### JavaScript/TypeScript

```typescript
import { personSchema, websiteSchema, toGraph } from "@vijayhardaha/schema";

const person = personSchema({ rootUrl: "https://example.com" });
const website = websiteSchema({ rootUrl: "https://example.com" });

// Use toGraph() to wrap multiple entities
const graph = toGraph([person, website]);
```

### React

```tsx
import JsonLd from "@vijayhardaha/schema/react";
import { personSchema, websiteSchema } from "@vijayhardaha/schema";

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <JsonLd
        data={[personSchema({ rootUrl: "https://example.com" }), websiteSchema({ rootUrl: "https://example.com" })]}
      />
    </div>
  );
}
```

## API Reference

### Schema Functions

| Function                    | Type                | Description                           |
| --------------------------- | ------------------- | ------------------------------------- |
| `personSchema`              | Person              | Schema.org Person entity              |
| `organizationSchema`        | Organization        | Schema.org Organization entity        |
| `websiteSchema`             | WebSite             | Schema.org WebSite entity             |
| `webpageSchema`             | WebPage             | Schema.org WebPage entity             |
| `aboutPageSchema`           | AboutPage           | Schema.org AboutPage entity           |
| `contactPageSchema`         | ContactPage         | Schema.org ContactPage entity         |
| `webAppSchema`              | WebApplication      | Schema.org WebApplication entity      |
| `webApiSchema`              | WebAPI              | Schema.org WebAPI entity              |
| `softwareApplicationSchema` | SoftwareApplication | Schema.org SoftwareApplication entity |
| `softwareSourceCodeSchema`  | SoftwareSourceCode  | Schema.org SoftwareSourceCode entity  |
| `breadcrumbSchema`          | BreadcrumbList      | Schema.org BreadcrumbList entity      |

### Utilities

| Function                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `validateUrl(url)`              | Validates HTTP(S) URLs, throws on invalid input |
| `deepMerge(target, source)`     | Recursively merges two objects                  |
| `mergeWithType(target, source)` | Merges objects while preserving `@type`         |
| `toGraph(entities)`             | Wraps entities in `@graph` structure            |

### React Components

| Component | Description                                    |
| --------- | ---------------------------------------------- |
| `JsonLd`  | Renders JSON-LD script tag with XSS protection |

## License

[MIT](LICENSE) - Copyright (c) 2025 Vijay Hardaha

## Author

[Vijay Hardaha](https://github.com/vijayhardaha)

## Issues

Report issues at https://github.com/vijayhardaha/schema-builder/issues
