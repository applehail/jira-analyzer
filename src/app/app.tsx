import { BrowserRouter } from "react-router";

import { withErrorHandler } from "./error-handling";
import { AppError } from "./error-handling/fallbacks/app-error/app-error";
import { Router } from "./router/router";
import { routes } from "./router/routes";
import "./zod-tr";

const App = () => {
  return (
    <BrowserRouter>
      <Router routes={routes} />
    </BrowserRouter>
  );
};

const AppWithErrorHandler = withErrorHandler(App, AppError);

export default AppWithErrorHandler;
