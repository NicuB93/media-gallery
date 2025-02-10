import { MediaProps, MediaTypes } from "@/mock/types";

export const getFilteredData = (
  data: MediaProps[] | undefined,
  queries: {
    search_query: string;
    types: (MediaTypes | undefined)[];
  }
) => {
  return data?.filter((item) => {
    if (queries.types.length > 0) {
      return (
        queries.types.includes(item.type) &&
        (queries.search_query
          ? item.title
              .toLowerCase()
              .includes(queries.search_query.toLowerCase())
          : true)
      );
    }

    return queries.search_query
      ? item.title.toLowerCase().includes(queries.search_query.toLowerCase())
      : true;
  });
};
