import { describe, it, expect } from 'vitest';
import { websiteSchema } from './website';

describe('websiteSchema', () => {
  it('should create a valid WebSite schema', () => {
    const result = websiteSchema({ rootUrl: 'https://example.com' });
    expect(result['@type']).toBe('WebSite');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => websiteSchema({ rootUrl: '' })).toThrow();
  });
});
