import { describe, it, expect } from 'vitest';
import { aboutPageSchema } from './webpage';

describe('aboutPageSchema', () => {
  it('should create a valid AboutPage schema', () => {
    const result = aboutPageSchema({
      rootUrl: 'https://example.com',
      name: 'About',
      description: 'About page',
      path: 'about',
    }) as Record<string, unknown>;
    expect(result['@type']).toBe('AboutPage');
  });
});
