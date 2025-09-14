import * as React from "react";

import { cn } from "@/lib/utils";
import { WarningIcon } from "@phosphor-icons/react";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
  error?: string;
}

function Input({ className, type, label, error, id, ...props }: InputProps) {
  return (
    <div className={cn("group flex flex-col gap-2 w-full", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "text-gray-500",
          error
            ? "text-danger font-bold"
            : "group-has-[input:active]:text-blue-base group-has-[input:active]:font-bold",
          className
        )}
      >
        {label}
      </Label>
      <div
        className={cn(
          "flex items-center w-full",
          "gap-2 h-12 px-4 border-gray-300 border rounded-lg",
          error
            ? "border-danger border-2"
            : "group-has-[input:active]:border-blue-base group-has-[input:active]:border-2",

          className
        )}
      >
        <input
          id={id}
          type={type}
          data-slot="input"
          className={cn(
            "flex w-full min-w-0 bg-transparent outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "text-md text-gray-400 font-normal [&:not(:placeholder-shown)]:text-dangergray-600",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-gray-500 font-normal [&_svg]:text-danger">
          <WarningIcon />
          {error}
        </div>
      )}
    </div>
  );
}

export { Input };
