import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";


interface NotePreviewMainProps {
  params: Promise<{id: string}>
}

const NotePreviewMain = async ({params}: NotePreviewMainProps) => {
  const { id } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteByIdServer(id),
    });
  
  return <HydrationBoundary state={dehydrate(queryClient)}>
    <NotePreviewClient noteId={id} />
  </HydrationBoundary>;
}

export default NotePreviewMain;