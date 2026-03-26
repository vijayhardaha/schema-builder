import { describe, it, expect } from 'vitest';
import { deepMerge, mergeWithType } from './deepMerge';

describe('deepMerge', () => {
  it('should merge two objects', () => {
    const base = { a: 1, b: 2 };
    const overrides = { b: 3, c: 4 };
    const result = deepMerge(base, overrides);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should deeply merge nested objects', () => {
    const base = { a: { b: 1, c: 2 } };
    const overrides = { a: { c: 3, d: 4 } };
    const result = deepMerge(base, overrides);
    expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
  });

  it('should replace arrays, not merge them', () => {
    const base = { a: [1, 2, 3] };
    const overrides = { a: [4, 5] };
    const result = deepMerge(base, overrides);
    expect(result).toEqual({ a: [4, 5] });
  });

  it('should return base when overrides is undefined', () => {
    const base = { a: 1 };
    const result = deepMerge(base, undefined);
    expect(result).toEqual({ a: 1 });
  });
});

describe('mergeWithType', () => {
  it('should merge and preserve @type', () => {
    const schema = { '@type': 'Person', name: 'John' };
    const overrides = { name: 'Jane', jobTitle: 'Developer' };
    const result = mergeWithType(schema, overrides);
    expect(result['@type']).toBe('Person');
    expect(result.name).toBe('Jane');
    expect(result.jobTitle).toBe('Developer');
  });

  it('should not override @type from overrides', () => {
    const schema = { '@type': 'Person', name: 'John' };
    const overrides = { '@type': 'Organization', name: 'Jane' };
    const result = mergeWithType(schema, overrides);
    expect(result['@type']).toBe('Person');
  });
});
