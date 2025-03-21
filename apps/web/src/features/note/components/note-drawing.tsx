import { useEffect } from "react";
import { Tldraw } from "tldraw";

import "tldraw/tldraw.css";

interface NoteDrawingProps {
  onClose: () => void;
  content: string;
}

export function NoteDrawing({ onClose, content }: NoteDrawingProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log("SAVING TLDRAW");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, content]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Tldraw persistenceKey="vim-note-drawing" />
    </div>
  );
}
