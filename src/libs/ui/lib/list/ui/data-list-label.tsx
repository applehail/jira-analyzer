import { cn } from "@/lib/utils";

export function DataListLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return <dt className={cn("text-sm font-medium text-muted-foreground sm:w-1/3", className)} {...props} />;
}
