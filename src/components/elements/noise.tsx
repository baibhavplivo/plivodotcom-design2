import React from "react";

import { cn } from "@/lib/utils";

const Noise = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "opacity-2 pointer-events-none absolute inset-0 bg-[url(/images/noise.webp)] bg-cover bg-center bg-no-repeat",
        className,
      )}
    />
  );
};

export default Noise;
