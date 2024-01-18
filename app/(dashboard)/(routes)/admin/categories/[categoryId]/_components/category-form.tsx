"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { Category } from "@prisma/client";
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
import { ImageForm } from "./image-form";

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const { setValue, register, trigger } = form;
  useEffect(() => {
    imageUrl && setValue("imageUrl", imageUrl);
    imageUrl && trigger("imageUrl");
  }, [imageUrl, setValue, trigger]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, data);
        //edit category
      } else {
        await axios.post(`/api/categories`, data);
        //new category
      }
      router.refresh();
      router.push(`/admin/categories`);
      toast({
        variant: "success",
        title: `${toastMessage}`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `something went wrong`,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/admin/categories`);
      toast({
        variant: "success",
        title: `Category deleted`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `"Error`,
        duration: 3000,
      });
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
      <div className="flex flex-col max-w-lg">
        <ImageForm
          initialData={initialData}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="max-w-xl p-4 rounded-md">
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
          </div>
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
                      placeholder="Category name"
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
