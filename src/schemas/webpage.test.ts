import { describe, it, expect } from 'vitest';
import { webpageSchema } from './webPage';

// describe: Tests for webpageSchema
describe('webpageSchema', () => {
  // it: should create a valid WebPage schema
  it('should create a valid WebPage schema', () => {
    const result = webpageSchema({
      rootUrl: 'https://example.com',
      name: 'About',
      description: 'About page',
      path: 'about',
    });
    // expect: returned schema has type WebPage
    expect(result['@type']).toBe('WebPage');
  });

  // it: should throw error for invalid rootUrl
  it('should throw error for invalid rootUrl', () => {
    // expect: invalid rootUrl triggers an error
    expect(() => webpageSchema({ rootUrl: '', name: 'Test', description: 'Test', path: 'test' })).toThrow();
  });
});
