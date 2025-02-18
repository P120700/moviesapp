export interface ShortMovie {
  id: string;
  title: string;
  year: number;
  format: string;
}

export interface FullMovie extends ShortMovie {
  actors: Array<string>;
}
