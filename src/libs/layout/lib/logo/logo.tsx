import { useState } from "react";
import { Link } from "react-router";

import { Cube } from "@/libs/ui";
import { path } from "@/app/router/route-paths";

export const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className="group text-lg font-bold tracking-tight transition-colors hover:text-primary flex items-center"
      to={path("main")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mr-2">Jira Analyzer</div>
      <Cube filled className="group-hover:translate-x-2 transition-transform duration-500 ease-out" isHovered={isHovered} />
    </Link>
  );
};
