"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { Equipment } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageForm } from "./image-form";
import ParametersInputs from "./parameters-inputs";
const parameterSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().min(1),
});

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
  producer: z.string().min(1),
  model: z.string().min(1),
  quantity: z.number().gte(1),
  price: z.number().gte(1),
  parameters: z.array(parameterSchema),
  categoryId: z.string().min(1),
});

type EquipmentFormValues = z.infer<typeof formSchema>;

interface EquipmentFormProps {
  initialData: Equipment | null;
  categories: Category[];
}

export const EquipmentForm: React.FC<EquipmentFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const title = initialData ? "Edit equipment" : "Create equipment";
  const description = initialData ? "Edit a equipment." : "Add a new equipment";
  const toastMessage = initialData
    ? "Equipment updated."
    : "Equipment created.";
  const action = initialData ? "Save changes" : "Create";

  const initialParameters = [{ name: "", value: "", unit: "" }];

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
      producer: "",
      model: "",
      quantity: 1,
      price: 0,
      parameters: initialParameters,
      categoryId: "",
    },
  });
  const { setValue, register, trigger } = form;

  useEffect(() => {
    imageUrl && setValue("imageUrl", imageUrl);
    imageUrl && trigger("imageUrl");
  }, [imageUrl, setValue, trigger]);

  const onSubmit = async (data: EquipmentFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/equipments/${params.equipmentId}`, data);
        //edit equipment
      } else {
        await axios.post(`/api/equipments`, data);
        //new equipment
      }
      router.refresh();
      router.push(`/admin/equipments`);
      return toast({
        variant: "success",
        title: `${toastMessage}`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Something went wrong`,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/equipments/${params.equipmentId}`);
      router.refresh();
      router.push(`/admin/equipments`);
      toast({
        variant: "success",
        title: `Equipment deleted`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Error`,
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
          <div className="max-w-xl">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Equipment image"
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
                      placeholder="Equipment name"
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
              name="producer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Producer"
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
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-xl">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Quantity"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Price"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ParametersInputs form={form} />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
