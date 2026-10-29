import { type ComponentType /*, StrictMode*/ } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import "dayjs/locale/ru";
dayjs.extend(objectSupport);
dayjs.locale("ru");

import { AppThemeProvider } from "@/libs/layout";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  // query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 5 * 1000,
      },
    },
  });

  // render
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </QueryClientProvider>,
    // </StrictMode>,
  );
}

export default render;
