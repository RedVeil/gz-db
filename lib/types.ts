export type Person = {
  firstName: string;
  lastName?: string;
  sex?: string;
  age?: number;
  birtday?: string;
  deathday?: string;
  home?: string;
  deathLocation?: string;
  id?: number;
  files?: any;
}

export type FieldSetItem = {
  key: string;
  label: string;
  description?: string;
  value: string;
}