import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export function Logo() {
  return (
    <div className="w-[130px]">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/logo1.webp"
          alt="logo"
          fill
          priority
          sizes="{max-width:130px}"
          className="object-contain"
        />
      </AspectRatio>
    </div>
  );
}
