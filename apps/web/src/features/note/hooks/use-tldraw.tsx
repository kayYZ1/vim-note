import { useState } from 'react';

interface UseTldrawReturn {
  isDrawing: boolean;
  setIsDrawing: (value: boolean) => void;
}

export function useTldraw(): UseTldrawReturn {
  const [isDrawing, setIsDrawing] = useState(false);

  return {
    isDrawing,
    setIsDrawing,
  };
}
