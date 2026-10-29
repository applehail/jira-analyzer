import { useCallback } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { path } from "@/app/router/route-paths";

export function ErrorPage() {
  const navigate = useNavigate();

  /**
   * return back
   */
  const backToStart = useCallback(() => {
    navigate(path("main"));
  }, [navigate]);

  return (
    <div>
      <h1>Произошла ошибка!</h1>
      <Button onClick={backToStart} className="large">
        Вернуться на главную страницу
      </Button>
    </div>
  );
}
