import { describe, it, expect } from 'vitest';
import { webAppSchema } from './webApplication';

describe('webAppSchema', () => {
  it('should create a valid WebApplication schema', () => {
    const result = webAppSchema({
      rootUrl: 'https://example.com',
      name: 'My App',
      description: 'A great app',
      path: 'app',
    });
    expect(result['@type']).toBe('WebApplication');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => webAppSchema({ rootUrl: '', name: 'Test', description: 'Test', path: 'test' })).toThrow();
  });
});
