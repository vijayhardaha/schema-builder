import { describe, it, expect } from 'vitest';

import { webPageSchema } from './webPage';

// describe: Tests for webPageSchema
describe('webPageSchema', () => {
  // it: should create a valid WebPage schema
  it('should create a valid WebPage schema', () => {
    const result = webPageSchema({ rootUrl: 'https://example.com', path: 'about' });
    // expect: returned schema has type WebPage
    expect(result['@type']).toBe('WebPage');
  });

  // it: should throw error for invalid rootUrl
  it('should throw error for invalid rootUrl', () => {
    // expect: invalid rootUrl triggers an error
    expect(() => webPageSchema({ rootUrl: '', path: 'test' })).toThrow();
  });
});
