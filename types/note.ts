export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export const noteTags = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export const allNoteTags = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
