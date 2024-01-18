import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-4 mb-4 pt-4">
        <Skeleton className="h-14 w-[300px]" />
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="flex flex-col items-start gap-2 sm:flex-row justify-between sm:items-center mb-4 pt-4">
        <div className="flex justify-between w-full"></div>
      </div>
      <div className="">
        <Skeleton className="w-full h-[70vh]" />
      </div>
    </div>
  );
};

export default Loading;
