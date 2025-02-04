import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

export const CheckboxWithText = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="items-center flex gap-2">
      <Checkbox id="terms1" className="" />
      <span className="text-[#878C91]">{children}</span>
    </div>
  );
};
