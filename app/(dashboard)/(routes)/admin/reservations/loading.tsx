import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Loading = () => {
  return (
    <div className="">
      <div className="flex flex-col items-start gap-2 sm:flex-row justify-between sm:items-center mb-4 pt-4">
        <Skeleton className="h-14 w-[300px]" />
        <Skeleton className="h-12 w-[150px]" />
      </div>
      <Separator />
      <div className="flex flex-col items-start gap-2 sm:flex-row justify-between sm:items-center mb-4 pt-4">
        <Skeleton className="h-10 w-[350px]" />
        <div className="flex justify-between w-full">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>
      <div className="">
        <Skeleton className="w-full h-[50vh]" />
      </div>
    </div>
  );
};

export default Loading;
