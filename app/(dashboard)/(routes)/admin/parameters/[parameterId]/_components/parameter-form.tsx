"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Parameter } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  unit: z.string().min(1),
});

type ParameterFormValues = z.infer<typeof formSchema>;

interface ParameterFormProps {
  initialData: Parameter | null;
}

export const ParameterForm: React.FC<ParameterFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit parameter" : "Create parameter";
  const description = initialData ? "Edit a parameter." : "Add a new parameter";
  const toastMessage = initialData
    ? "Parameter updated."
    : "Parameter created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ParameterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      unit: "",
    },
  });

  // const { setValue, register, trigger } = form;
  // useEffect(() => {
  //   imageUrl && setValue("imageUrl", imageUrl);
  //   imageUrl && trigger("imageUrl");
  // }, [imageUrl, setValue, trigger]);

  const onSubmit = async (data: ParameterFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/parameters/${params.parameterId}`, data);
        //edit parameter
      } else {
        await axios.post(`/api/parameters`, data);
        //new parameter
      }
      router.refresh();
      router.push(`/admin/parameters`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/parameters/${params.parameterId}`);
      router.refresh();
      router.push(`/admin/parameters`);
      toast.success("Parameter deleted.");
    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      {/* <div className="flex flex-col max-w-lg">
        <ImageForm
          initialData={initialData}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />
      </div> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* <div className="max-w-xl">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category image"
                      {...field}
                      {...register("imageUrl")}
                      readOnly
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div className="max-w-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Parameter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-xl">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Parameter unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
