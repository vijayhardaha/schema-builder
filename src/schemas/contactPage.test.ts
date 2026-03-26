import { describe, it, expect } from 'vitest';
import { contactPageSchema } from './webpage';

describe('contactPageSchema', () => {
  it('should create a valid ContactPage schema', () => {
    const result = contactPageSchema({
      rootUrl: 'https://example.com',
      name: 'Contact',
      description: 'Contact page',
      path: 'contact',
    }) as Record<string, unknown>;
    expect(result['@type']).toBe('ContactPage');
  });
});
