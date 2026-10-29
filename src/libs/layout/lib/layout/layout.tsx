import { Outlet } from "react-router";

import { Spinner } from "@/components/ui/spinner";
import { useShowLoader } from "@/store";
import { Page } from "@/libs/ui";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export function Layout() {
  const showLoader = useShowLoader();

  if (showLoader) {
    return (
      <Page>
        <Spinner />
      </Page>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <Page>
        <Outlet />
      </Page>
      <Footer />
    </div>
  );
}
