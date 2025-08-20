// Helper function for date filters
// Return ISO 8601 string for n days ago
export function isoNDaysAgo(n: number) {
  // n days ago in UTC, as ISO 8601 string
  const ms = n * 24 * 60 * 60 * 1000;
  return new Date(Date.now() - ms).toISOString(); // ends with 'Z' (UTC)
}