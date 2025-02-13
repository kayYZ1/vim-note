export interface Note {
  id: number;
  date: string;
  title: string;
  description?: string;
  content?: string;
}

export interface Folder {
  id: number;
  name: string;
  notes?: Note[];
}