"use client";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const ImageUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log(res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast({
          variant: "success",
          title: `${error?.message}`,

          duration: 3000,
        });
      }}
    />
  );
};

export default ImageUpload;
