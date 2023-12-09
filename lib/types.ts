export type Person = {
  id: string;
  first_name: string;
  last_name?: string;
  sex?: string;
  age?: number;
  birth_day: number;
  date_of_death: number;
  home?: string;
  location_of_death?: string;
  files?: any;
}

export type FieldSetItem = {
  key: string;
  label: string;
  description?: string;
}