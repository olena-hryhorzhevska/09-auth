import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note, FetchNotesResponse } from "@/types/note";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotesServer = async (
  name: string,
  page: number,
  perPage: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search: name,
      page,
      perPage,
      tag: tag?.trim() || undefined,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
