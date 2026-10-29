import { cn } from "@/lib/utils"

export function DataListItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col border-b border-muted pb-1 sm:col-span-3 sm:flex-row sm:justify-between sm:pb-1", className)} {...props} />
}
