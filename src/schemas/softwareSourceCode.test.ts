import { describe, it, expect } from 'vitest';
import { softwareSourceCodeSchema } from './softwareSourceCode';

describe('softwareSourceCodeSchema', () => {
  it('should create a valid SoftwareSourceCode schema', () => {
    const result = softwareSourceCodeSchema({
      rootUrl: 'https://example.com',
      name: 'My Code',
      description: 'Source code',
      path: 'code',
    }) as Record<string, unknown>;
    expect(result['@type']).toBe('SoftwareSourceCode');
  });

  it('should throw error for invalid rootUrl', () => {
    expect(() => softwareSourceCodeSchema({ rootUrl: '', name: 'Test', description: 'Test', path: 'test' })).toThrow();
  });
});
