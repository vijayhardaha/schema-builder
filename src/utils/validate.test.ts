import { describe, it, expect } from 'vitest';
import { validateUrl } from './validate';

describe('validateUrl', () => {
  it('should return normalized URL for valid HTTPS URLs', () => {
    expect(validateUrl('https://example.com')).toBe('https://example.com');
    expect(validateUrl('https://example.com/')).toBe('https://example.com');
    expect(validateUrl('https://example.com/path/')).toBe('https://example.com/path');
  });

  it('should return normalized URL for valid HTTP URLs', () => {
    expect(validateUrl('http://example.com')).toBe('http://example.com');
    expect(validateUrl('http://localhost:3000')).toBe('http://localhost:3000');
  });

  it('should throw error for empty string', () => {
    expect(() => validateUrl('')).toThrow('URL is required and must be a non-empty string');
  });

  it('should throw error for null', () => {
    expect(() => validateUrl(null as unknown as string)).toThrow('URL is required and must be a non-empty string');
  });

  it('should throw error for undefined', () => {
    expect(() => validateUrl(undefined as unknown as string)).toThrow('URL is required and must be a non-empty string');
  });

  it('should throw error for whitespace-only string', () => {
    expect(() => validateUrl('   ')).toThrow('URL is required and must be a non-empty string');
  });

  it('should throw error for invalid URL pattern (no protocol)', () => {
    expect(() => validateUrl('example.com')).toThrow('URL must be a valid HTTP/HTTPS URL');
  });

  it('should throw error for FTP URLs', () => {
    expect(() => validateUrl('ftp://example.com')).toThrow('URL must be a valid HTTP/HTTPS URL');
  });
});
