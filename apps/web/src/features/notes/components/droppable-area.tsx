import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function DroppableArea({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="space-y-1">
      {children}
    </div>
  );
}
