// Pure route id -> path lookup, kept dependency-free on purpose: `routes.ts` pulls in
// `pageLoader` (which imports `@/libs/ui`), and several `@/libs/ui`/`@/libs/widgets`
// components need to resolve a route path. If those components imported `path` from
// `routes.ts` directly, that would form a circular import (routes.ts -> @/libs/common ->
// @/libs/ui -> a component -> routes.ts) and break at runtime with a
// "Cannot access 'pageLoader' before initialization" error. Import `path`/`routePaths`
// from this module instead of from `./routes`.
export const routePaths = {
  main: "/",
  /** вход по QR-коду: /qr/{uuid метки qr_marker} */
  qr: "/qr/:id",
} as const;

/**
 * find section path
 * @param id
 */
export const path = (id: string) => {
  const found = (routePaths as Record<string, string>)[id];
  if (!found) {
    throw new Error("findPath: section " + id + " not found");
  }
  return found;
};
