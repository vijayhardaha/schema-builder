# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-03-28

### Added

- ESLint resolver configuration for TypeScript paths

### Fixed

- ESLint `import/no-unresolved` errors for `@vijayhardaha/dev-config` imports

### Test

- Improved test coverage from 88% to 100%
- Added tests for `softwareAppSchema` optional fields
- Added tests for `webPageSchema` options (breadcrumb, mainEntityId)
- Added tests for `aboutPageSchema` and `contactPageSchema`

### Refactor

- Removed redundant cleanup code from all schemas (deepMerge handles undefined values)

## [1.0.0] - 2026-03-27

### Added

- Initial release
- Schema.org structured data utilities with TypeScript support
- React components for JSON-LD script tags
- Utility functions for merging, validating, and building schemas

### Features

- `personSchema` - Person entity with creator profile
- `organizationSchema` - Organization linked to creator
- `webSiteSchema` - Website with search action
- `webpageSchema` - General web page
- `aboutPageSchema` - About page
- `contactPageSchema` - Contact page
- `webApiSchema` - WebAPI with pricing and platform
- `softwareAppSchema` - Software application with pricing
- `breadcrumbSchema` - Navigation breadcrumb list

### Utilities

- `validateUrl()` - Validates HTTP(S) URLs, throws on invalid
- `resolveUrl()` - Resolves URL with path
- `cleanUrl()` - Cleans URL (trailing slash, query strings)
- `deepMerge()` - Recursively merges objects
- `mergeWithType()` - Merges while preserving `@type`
- `toGraph()` - Wraps entities in `@graph` structure
- `buildId()` - Builds schema ID from URL and fragment

### React Components

- `JsonLd` - Renders JSON-LD script tag with XSS protection

### Build

- Vite multi-entry build (ESM only)
- TypeScript declaration files via vite-plugin-dts
