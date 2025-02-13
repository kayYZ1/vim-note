import { useRef, useEffect } from "react";

export default function EditableNote() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    textareaRef.current?.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => {
      textareaRef.current?.removeEventListener("input", adjustHeight);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <textarea
        ref={textareaRef}
        defaultValue={"My first note!"}
        className="w-full h-full max-h-full text-base rounded-md focus:outline-none focus:border-transparent resize-none overflow-hidden"
      />
    </div>
  );
}
