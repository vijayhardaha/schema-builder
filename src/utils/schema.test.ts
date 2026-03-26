import { describe, it, expect } from 'vitest';
import { buildId, toGraph } from './schema';

describe('buildId', () => {
  it('should build a schema ID from URL and id', () => {
    expect(buildId('https://example.com', 'person')).toBe('https://example.com#person');
    expect(buildId('https://example.com', 'website')).toBe('https://example.com#website');
  });

  it('should remove trailing slash from URL', () => {
    expect(buildId('https://example.com/', 'person')).toBe('https://example.com#person');
    expect(buildId('https://example.com/page/', 'app')).toBe('https://example.com/page#app');
  });
});

describe('toGraph', () => {
  it('should wrap a single entity in @graph', () => {
    const entity = { '@type': 'Person', name: 'John' };
    const result = toGraph(entity);
    expect(result).toEqual({ '@context': 'https://schema.org', '@graph': [entity] });
  });

  it('should wrap multiple entities in @graph', () => {
    const person = { '@type': 'Person', name: 'John' };
    const website = { '@type': 'WebSite', name: 'Example' };
    const result = toGraph(person, website);
    expect(result).toEqual({ '@context': 'https://schema.org', '@graph': [person, website] });
  });

  it('should handle empty entities', () => {
    const result = toGraph();
    expect(result).toEqual({ '@context': 'https://schema.org', '@graph': [] });
  });
});
