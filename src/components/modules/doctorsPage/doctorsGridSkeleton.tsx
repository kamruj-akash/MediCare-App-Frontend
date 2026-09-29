import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_CARDS = 6;

export default function DoctorsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: SKELETON_CARDS }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="size-14 shrink-0 rounded-2xl" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
            </div>
          </div>
          <div className="mt-5 space-y-2.5 border-t border-border pt-5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3.5 w-1/2" />
          </div>
          <Skeleton className="mt-6 h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
