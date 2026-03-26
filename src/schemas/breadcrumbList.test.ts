import { describe, it, expect } from 'vitest';
import { breadcrumbSchema } from './breadcrumbList';

describe('breadcrumbSchema', () => {
  it('should create a valid BreadcrumbList schema', () => {
    const items = [
      { name: 'Home', path: '' },
      { name: 'About', path: 'about' },
    ];
    const result = breadcrumbSchema({ rootUrl: 'https://example.com', items }) as {
      '@type': string;
      itemListElement: { position: number }[];
    };
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => breadcrumbSchema({ rootUrl: '', items: [{ name: 'Home', path: '' }] })).toThrow();
  });
});
