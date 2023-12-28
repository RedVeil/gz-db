export type Person = {
  id: string;
  name: string;
  sex: string;
  age: string;
  target_id?: string;
}

export type LocalizedTerm = {
  eng: string;
  arabic: string;
}

export type FieldSetItem = {
  key: string;
  label: string;
  description?: string;
}

export type Index = {
  start: number;
  end: number;
}