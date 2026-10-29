import { cn } from "@/lib/utils"

export function DataList({ className, ...props }: React.ComponentProps<"dl">) {
  return <dl className={cn("grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4", className)} {...props} />
}
