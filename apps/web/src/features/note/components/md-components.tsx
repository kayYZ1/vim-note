import { Components } from "react-markdown";

import LocalImage from "./local-image";
/*
  Custom components for markdown rendering
*/
export const mdComponents: Components = {
  h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-bold">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xl font-bold">{children}</h4>,
  h5: ({ children }) => <h5 className="text-lg font-bold">{children}</h5>,
  h6: ({ children }) => <h6 className="text-base font-bold">{children}</h6>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-inherit"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => {
    if (src && src.startsWith("/local-image/")) {
      return <LocalImage src={src} alt={alt || "Local image"} />;
    }
    return (
      <img
        src={src}
        alt={alt || "Url image"}
        loading="eager"
        className="w-full max-w-full h-auto py-2 blur-sm transition-all duration-500"
        onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
        onError={(e) => e.currentTarget.classList.remove("blur-sm")}
      />
    );
  },
  ul: ({ children }) => <ul className="list-disc px-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal px-6">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ children }) => <code className="font-mono rounded">{children}</code>,
  pre: ({ children }) => (
    <pre className="rounded overflow-x-auto py-2">
      <code>{children}</code>
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-400 pl-4 my-2 italic text-gray-500">
      {children}
    </blockquote>
  ),
};
