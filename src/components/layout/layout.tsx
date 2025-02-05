import { ReactNode } from "@tanstack/react-router";
import { Header } from "./header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      {children}
    </div>
  );
};
