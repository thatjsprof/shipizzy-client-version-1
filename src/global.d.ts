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
  format?: (value: number) => string;
}
