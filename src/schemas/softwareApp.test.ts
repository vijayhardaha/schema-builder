import { describe, it, expect } from 'vitest';

import { softwareAppSchema } from './softwareApp';

// describe: Tests for softwareAppSchema
describe('softwareAppSchema', () => {
  // it: should create a valid SoftwareApplication schema
  it('should create a valid SoftwareApplication schema', () => {
    const result = softwareAppSchema({ rootUrl: 'https://example.com', path: 'app' });
    // expect: verifies the returned @type is SoftwareApplication
    expect(result['@type']).toBe('SoftwareApplication');
  });

  // it: should throw error for invalid rootUrl
  it('should throw error for invalid rootUrl', () => {
    // expect: throws when rootUrl is empty
    expect(() => softwareAppSchema({ rootUrl: '', path: 'test' })).toThrow();
  });

  // it: should remove undefined fields from overrides
  it('should remove undefined fields from overrides', () => {
    const result = softwareAppSchema({ rootUrl: 'https://example.com', path: 'app' }, { version: undefined });
    // expect: undefined fields are removed
    expect((result as unknown as Record<string, unknown>).version).toBeUndefined();
  });
});
