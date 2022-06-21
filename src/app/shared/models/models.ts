export enum DataColumnType {
  TEXT,
  LINK,
  DATE,
  TEMPLATE,
}

export interface DatatableLink {
  href: string;
  external: boolean;
}

export interface DatatableColData {
  type: DataColumnType;
  title: string;
  label: string;
}
