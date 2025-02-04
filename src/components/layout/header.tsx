import { CheckboxWithText } from "./header-checkbox";
import { HeaderSelect } from "./header-folder-select";

export const Header = () => {
  return (
    <header className="flex items-center pl-2 gap-6 border-b h-[64px] w-full">
      <CheckboxWithText>0 selected</CheckboxWithText>
      <HeaderSelect />
    </header>
  );
};
