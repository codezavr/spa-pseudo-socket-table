interface TableItem {
  id: string;
  int: number;
  float: number;
  color: string;
  child: TableItemChild
}

export type TableItems = TableItem[];

interface TableItemChild {
  id: string;
  color: string;
}

export interface FiltersFormData {
  interval: number;
  arraySize: number;
  additionalIds: string
}
