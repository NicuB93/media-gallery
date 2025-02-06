import { MediaTypes } from "@/mock/types";
import { useSearch } from "@tanstack/react-router";

export const useFilterTypes = () => {
  const searchParams: { types: (MediaTypes | undefined)[] } = useSearch({
    strict: false,
  });

  const searchTypes = searchParams.types || [];

  return searchTypes;
};
