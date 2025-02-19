import { useRef, useEffect } from "react";

import NoteActions from "./note-actions";

export default function EditableNote() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    const adjustHeight = () => {
      if (div) {
        div.style.height = "auto";
        div.style.height = `${div.scrollHeight}px`;
      }
    };

    div?.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => {
      div?.removeEventListener("input", adjustHeight);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <NoteActions>
        <div
          ref={divRef}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={() => {}} // Ensures React does not interfere
          className="w-full h-full max-h-full text-base rounded-md focus:outline-none border-2 resize-none overflow-hidden"
        />
      </NoteActions>
    </div>
  );
}
