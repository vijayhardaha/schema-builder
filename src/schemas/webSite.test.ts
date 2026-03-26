import { describe, it, expect } from 'vitest';
import { websiteSchema } from './webSite';

// describe: Tests for websiteSchema
describe('websiteSchema', () => {
  // it: should create a valid WebSite schema
  it('should create a valid WebSite schema', () => {
    const result = websiteSchema({ rootUrl: 'https://example.com' });
    // expect: confirms the schema @type is WebSite
    expect(result['@type']).toBe('WebSite');
  });

  // it: should throw error for invalid rootUrl
  it('should throw error for invalid rootUrl', () => {
    // expect: invalid rootUrl causes an error to be thrown
    expect(() => websiteSchema({ rootUrl: '' })).toThrow();
  });
});
