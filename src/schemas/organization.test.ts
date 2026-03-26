import { describe, it, expect } from 'vitest';
import { organizationSchema } from './organization';

describe('organizationSchema', () => {
  it('should create a valid Organization schema', () => {
    const result = organizationSchema({ rootUrl: 'https://example.com' });
    expect((result as unknown as Record<string, unknown>)['@type']).toBe('Organization');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => organizationSchema({ rootUrl: '' })).toThrow();
  });
});
