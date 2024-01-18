import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import React from "react";
import { useFieldArray } from "react-hook-form";

interface ParametersInputsProps {
  form: any;
}

const ParametersInputs: React.FC<ParametersInputsProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parameters",
  });
  return (
    <div>
      <div className="pt-4 text-sm font-medium ">Parameters</div>
      {fields.map((field, index) => (
        <fieldset
          key={field.id}
          className="flex gap-4 items-end border-[1px] max-w-3xl p-4 my-4 rounded-lg"
        >
          <div className="max-w-sm">
            <FormField
              control={form.control}
              name={`parameters.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Parameter name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Parameter name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-sm">
            <FormField
              control={form.control}
              name={`parameters.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Parameter value
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Parameter value" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-sm">
            <FormField
              control={form.control}
              name={`parameters.${index}.unit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Parameter unit
                  </FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Parameter unit" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="remove"
                  onClick={() => remove(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove parameter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </fieldset>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ name: "", value: "", unit: "" })}
      >
        Add Parameter
      </Button>
    </div>
  );
};

export default ParametersInputs;
