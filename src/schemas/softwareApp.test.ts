import { describe, it, expect } from 'vitest';
import { softwareAppSchema } from './softwareApp';

describe('softwareAppSchema', () => {
  it('should create a valid SoftwareApplication schema', () => {
    const result = softwareAppSchema({
      rootUrl: 'https://example.com',
      name: 'My App',
      description: 'A great app',
      path: 'app',
    });
    expect(result['@type']).toBe('SoftwareApplication');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => softwareAppSchema({ rootUrl: '', name: 'Test', description: 'Test', path: 'test' })).toThrow();
  });
});
