export function buildCanonicalUrl(rootUrl: string, path: string = ''): string {
  return new URL(path, rootUrl).toString().replace(/\/$/, '');
}
