import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserIcon as Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const UserIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="ml-4">
            <AvatarFallback>
              <Icon />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>No user</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
