import { Route, Routes } from "react-router";

import { Layout } from "@/libs/layout";
import ErrorPage from "../pages/error-page";
import type { RouteItems } from "./routes.types";

type RouterProps = {
  routes: RouteItems;
};

export const Router = ({ routes }: RouterProps) => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ component: Component, ...rest }) => (
          <Route key={rest.id} element={<Component />} {...rest} />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
