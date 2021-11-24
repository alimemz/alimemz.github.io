
/**Clone fetch API and immitate its data loading delay */
export default function mockFetch<T>(importedJSON: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(importedJSON), 2000));
}
