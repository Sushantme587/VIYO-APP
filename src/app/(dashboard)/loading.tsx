import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid h-[calc(100vh-8rem)] gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="lg:col-span-4">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
      <div className="lg:col-span-3">
        <div className="flex h-full flex-col gap-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
