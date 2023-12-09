"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/logo1.webp";
      break;
    case "dark":
      src = "/logo.webp";
      break;
    default:
      src = "/logo1.webp";
      break;
  }

  return (
    <div style={{ position: "relative", width: "130px", height: "40px" }}>
      <Image
        src={src}
        alt="logo"
        fill
        sizes="(min-width: 108px) 50vw, 100vw"
        style={{
          objectFit: "contain", // cover, contain, none
        }}
      />
    </div>
  );
}
