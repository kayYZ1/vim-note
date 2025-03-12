declare module 'tldraw' {
  import { ReactNode } from 'react';
  
  export interface TldrawProps {
    children?: ReactNode;
    persistenceKey?: string;
  }

  export function Tldraw(props: TldrawProps): JSX.Element;
}
