import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "@/components/loader";

const Loading = () => {
  return (
    // <div className="p-8">
    //   <Skeleton className="h-16 w-full" />
    //   <div className="flex flex-wrap justify-evenly gap-4 mt-4">
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //     <Skeleton className="w-[300px] h-[300px] rounded-xl" />
    //   </div>
    // </div>
    <Loader />
  );
};

export default Loading;
