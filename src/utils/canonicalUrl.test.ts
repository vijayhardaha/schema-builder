import { describe, it, expect } from 'vitest';
import { buildCanonicalUrl } from './canonicalUrl';

describe('buildCanonicalUrl', () => {
  it('should build a canonical URL with path', () => {
    expect(buildCanonicalUrl('https://example.com', 'about')).toBe('https://example.com/about');
  });

  it('should remove trailing slash when path is empty', () => {
    expect(buildCanonicalUrl('https://example.com/', '')).toBe('https://example.com');
    expect(buildCanonicalUrl('https://example.com', '')).toBe('https://example.com');
  });

  it('should remove trailing slash when path is /', () => {
    expect(buildCanonicalUrl('https://example.com', '/')).toBe('https://example.com');
    expect(buildCanonicalUrl('https://example.com/', '/')).toBe('https://example.com');
  });
});
