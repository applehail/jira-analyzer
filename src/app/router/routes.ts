import { pageLoader } from "@/libs/common";
import { path } from "./route-paths";
import type { RouteItems } from "./routes.types";

export const routes: RouteItems = [
  {
    id: "main",
    name: "Навигация",
    path: path("main"),
    component: pageLoader(() => import("@/app/pages/main-page")),
  },
  {
    id: "qr",
    name: "Навигация (QR)",
    path: path("qr"),
    component: pageLoader(() => import("@/app/pages/main-page")),
  },
];
