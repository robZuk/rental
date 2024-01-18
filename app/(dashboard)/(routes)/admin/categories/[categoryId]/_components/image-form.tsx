"use client";

import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Category } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";

interface ImageFormProps {
  initialData: Category | null;
  setImageUrl: (value: string) => void;
  imageUrl: string;
}

export const ImageForm = ({
  initialData,
  setImageUrl,
  imageUrl,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border  rounded-md p-4">
      <div className="font-medium text-sm flex items-center justify-between pb-3">
        Category image
        <Button onClick={toggleEdit} variant="ghost" className="p-2">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl && !imageUrl ? (
          <div className="flex items-center justify-center h-60  border rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-contain border p-4 rounded-md"
              src={
                imageUrl
                  ? imageUrl
                  : initialData
                  ? initialData.imageUrl
                  : imageUrl
              }
            />
          </div>
        ))}

      {isEditing && (
        <div className="p-2">
          <ImageUpload
            endpoint="categoryImage"
            onChange={(url) => {
              if (url) {
                setImageUrl(url);
                setIsEditing(false);
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
