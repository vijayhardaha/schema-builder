// Matches URLs starting with http:// or https:// protocol.
const URL_REGEX = /^https?:\/\/.+/;

/**
 * Validates and normalizes a URL by ensuring it uses HTTP/HTTPS and stripping trailing slashes.
 *
 * @param {string} url - The URL string to validate.
 * @returns The validated URL with trailing slash removed.
 * @throws {Error} If the URL is empty, not a string, or uses an invalid protocol.
 *
 * @example
 * validateUrl('https://example.com/'); // 'https://example.com'
 */
export function validateUrl(url: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    throw new Error('URL is required and must be a non-empty string');
  }

  if (!URL_REGEX.test(url)) {
    throw new Error('URL must be a valid HTTP/HTTPS URL');
  }

  return url.replace(/\/$/, '');
}
