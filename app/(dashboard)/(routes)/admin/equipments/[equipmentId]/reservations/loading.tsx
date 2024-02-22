import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/loader";

const Loading = () => {
  return (
    // <div className="">
    //   <div className="flex gap-2 flex-row justify-between sm:items-center mb-4 pt-4">
    //     <Skeleton className="h-14 w-[300px]" />
    //   </div>
    //   <div className="flex flex-col gap-2 mt-8 max-w-[300px]">
    //     <Skeleton className="h-[300px]  w-full" />
    //   </div>
    // </div>
    <Loader />
  );
};

export default Loading;
