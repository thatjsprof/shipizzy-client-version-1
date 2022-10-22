type LinksType = {
  name: string;
  icon: string;
  active?: boolean;
  url: string;
}[];

interface Column {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: string | number) => string | number;
}

type FilterParams = {
  next?: string;
  previous?: string;
};

interface FilterObject {
  page?: number;
  next?: string;
  first: number;
  userID: string;
  previous?: string;
  searchString?: string;
}

type PaginatedListResponse<T> = {
  nodes: T[];
  totalCount: number;
  cursor: {
    next?: string | null;
    current?: string | null;
    previous?: string | null;
  };
  pageInfo: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
};
