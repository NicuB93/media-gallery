import { ReactNode } from "@tanstack/react-router";
import { Header } from "./header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
