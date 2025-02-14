import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/lib/db";
import { getCurrentDate } from "@/lib/utils";

export default function NoteGuard() {
  const navigate = useNavigate();
  const notes = useLiveQuery(() => db.notes.toArray());

  useEffect(() => {
    if (!notes) return;

    const lastViewedNote = localStorage.getItem("lastViewed");
    const parsedLastViewedNote = lastViewedNote
      ? JSON.parse(lastViewedNote)
      : null;

    if (notes.length > 0) {
      navigate(
        parsedLastViewedNote
          ? `/notes/${parsedLastViewedNote}`
          : `/notes/${notes[notes.length - 1].id}`,
      );
    } else {
      (async () => {
        const noteId = await db.notes.add({
          title: "Note title",
          description: "Loose note description",
          date: getCurrentDate(),
        });
        localStorage.setItem("lastViewed", JSON.stringify(noteId));
        navigate(`/notes/${noteId}`);
      })();
    }
  }, [notes, navigate]);

  return <Outlet />;
}
