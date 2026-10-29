import { cn } from "@/lib/utils";

export function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return <dd className={cn("min-w-0 text-sm font-semibold break-words text-foreground sm:w-2/3 sm:text-right", className)} {...props} />;
}
