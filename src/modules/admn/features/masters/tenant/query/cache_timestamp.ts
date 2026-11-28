export default function CacheTimeStamped<T>(data: T) {
  return {
    data,
    cacheTimestamp: new Date().toISOString(),
  };
}
