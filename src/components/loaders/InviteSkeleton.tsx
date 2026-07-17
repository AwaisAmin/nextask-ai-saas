import { Skeleton } from "@/components/ui/skeleton";

export const InviteSkeleton = () => (
  <div className="text-center">
    <Skeleton className="w-16 h-16 rounded-[18px] mx-auto mb-5" />
    <Skeleton className="h-3 w-24 mx-auto mb-3" />
    <Skeleton className="h-7 w-60 mx-auto mb-2" />
    <Skeleton className="h-4 w-44 mx-auto mb-1.5" />
    <Skeleton className="h-7 w-20 mx-auto mb-7" />
    <div className="flex gap-2.5">
      <Skeleton className="h-12 flex-1 rounded-xl" />
      <Skeleton className="h-12 flex-1 rounded-xl" />
    </div>
  </div>
);
