import { useEffect } from 'react';
import { Tldraw } from 'tldraw';

import 'tldraw/tldraw.css';

interface NoteDrawingProps {
  onClose: () => void;
  content: string;
}

export function NoteDrawing({ onClose, content  }: NoteDrawingProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, content]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          onClick={() => console.log("I DONT SEE THAT")}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="rounded-md bg-muted px-4 py-2 hover:bg-muted/90"
        >
          Cancel
        </button>
      </div>
      <Tldraw persistenceKey="vim-note-drawing" />
    </div>
  );
}
