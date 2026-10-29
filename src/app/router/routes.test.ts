import { describe, it, expect } from "vitest";

import { routes } from "./routes";
import { path } from "./route-paths";

describe("path", () => {
  it("resolves a route id to its registered path", () => {
    for (const route of routes) {
      expect(path(route.id)).toBe(route.path);
    }
  });

  it("throws for an unknown route id", () => {
    expect(() => path("nonexistent-id")).toThrow(/section nonexistent-id not found/);
  });
});
