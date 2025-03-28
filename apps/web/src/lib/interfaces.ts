export interface Note {
  id: string;
  date: string;
  title: string;
  description?: string;
  content?: string;
}

export interface Folder {
  id: string;
  name: string;
  color: string | null;
  notes: Note[];
}

export interface Image {
  id: number;
  name: string;
  src: string;
  date: Date;
}
