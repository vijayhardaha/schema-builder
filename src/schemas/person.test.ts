import { describe, it, expect } from 'vitest';
import { personSchema } from './person';

describe('personSchema', () => {
  it('should create a valid Person schema', () => {
    const result = personSchema({ rootUrl: 'https://example.com' });
    expect((result as unknown as Record<string, unknown>)['@type']).toBe('Person');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => personSchema({ rootUrl: '' })).toThrow();
  });
});
