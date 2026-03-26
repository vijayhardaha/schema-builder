import { describe, it, expect } from 'vitest';
import { webpageSchema } from './webpage';

describe('webpageSchema', () => {
  it('should create a valid WebPage schema', () => {
    const result = webpageSchema({
      rootUrl: 'https://example.com',
      name: 'About',
      description: 'About page',
      path: 'about',
    });
    expect(result['@type']).toBe('WebPage');
    expect(result.name).toBe('About');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => webpageSchema({ rootUrl: '', name: 'Test', description: 'Test', path: 'test' })).toThrow();
  });
});
