import { describe, it, expect } from 'vitest';
import { webApiSchema } from './webAPI';

describe('webApiSchema', () => {
  it('should create a valid WebAPI schema', () => {
    const result = webApiSchema({
      rootUrl: 'https://example.com',
      name: 'My App',
      description: 'A great app',
      path: 'app',
    });
    expect(result['@type']).toBe('WebAPI');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => webApiSchema({ rootUrl: '', name: 'Test', description: 'Test', path: 'test' })).toThrow();
  });
});
