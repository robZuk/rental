// "use client";
import { Skeleton } from "@/components/ui/skeleton";
// import { Loader } from "@/components/loader";

const Loading = () => {
  return (
    <div className="p-8">
      <Skeleton className="h-16 w-full" />
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-8 h-full">
        <div className="mt-6 lg:col-span-4 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>
      </div>
    </div>
    // <div className="absolute z-50 flex h-full w-full items-center justify-center">
    //   <Loader />
    // </div>
  );
};

export default Loading;
