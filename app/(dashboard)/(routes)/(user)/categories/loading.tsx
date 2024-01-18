import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-8">
      <Skeleton className="h-16 w-full" />
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-8 h-full">
        <div className="mt-6 lg:col-span-4 lg:mt-0">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
