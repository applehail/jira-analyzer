import { cn } from "@/lib/utils";

export function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return <dd className={cn("text-sm font-semibold text-foreground sm:w-2/3 sm:text-right", className)} {...props} />;
}
