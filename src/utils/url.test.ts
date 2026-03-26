import { describe, it, expect } from 'vitest';
import { resolveUrl, cleanUrl } from './url';

describe('resolveUrl', () => {
  it('should build a canonical URL with path', () => {
    expect(resolveUrl('https://example.com', 'about')).toBe('https://example.com/about');
  });

  it('should remove trailing slash when path is empty', () => {
    expect(resolveUrl('https://example.com/', '')).toBe('https://example.com');
    expect(resolveUrl('https://example.com', '')).toBe('https://example.com');
  });

  it('should remove trailing slash when path is /', () => {
    expect(resolveUrl('https://example.com', '/')).toBe('https://example.com');
    expect(resolveUrl('https://example.com/', '/')).toBe('https://example.com');
  });
});

describe('cleanUrl', () => {
  it('should remove trailing slash when true', () => {
    expect(cleanUrl('https://example.com/', true)).toBe('https://example.com');
    expect(cleanUrl('https://example.com/page/', true)).toBe('https://example.com/page');
  });

  it('should add trailing slash when false', () => {
    expect(cleanUrl('https://example.com', false)).toBe('https://example.com/');
    expect(cleanUrl('https://example.com/page', false)).toBe('https://example.com/page/');
  });

  it('should not modify URL already in correct state', () => {
    expect(cleanUrl('https://example.com', true)).toBe('https://example.com');
    expect(cleanUrl('https://example.com/', false)).toBe('https://example.com/');
  });

  it('should remove query string when true', () => {
    expect(cleanUrl('https://example.com/page?q=1', true, true)).toBe('https://example.com/page');
    expect(cleanUrl('https://example.com/page?q=1&sort=asc', true, true)).toBe('https://example.com/page');
  });

  it('should preserve query string when false', () => {
    expect(cleanUrl('https://example.com/page?q=1', true, false)).toBe('https://example.com/page?q=1');
  });
});
