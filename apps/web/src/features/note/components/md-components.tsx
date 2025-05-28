import { Components } from "react-markdown";

import LocalImage from "./local-image";

/*
 * Custom <ReactMarkdown> components covering every standard Markdown element
 * that maps to an HTML tag (including GFM additions).
 */
export const mdComponents: Components = {
  /* -------------------------------------------------- */
  /* Headings                                           */
  /* -------------------------------------------------- */
  h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-bold">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xl font-bold">{children}</h4>,
  h5: ({ children }) => <h5 className="text-lg font-bold">{children}</h5>,
  h6: ({ children }) => <h6 className="text-base font-bold">{children}</h6>,

  /* -------------------------------------------------- */
  /* Paragraphs & inline formatting                      */
  /* -------------------------------------------------- */
  p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="line-through">{children}</del>,
  br: () => <div className="py-2" />,
  hr: () => <hr className="my-4 border-t border-gray-300" />,

  /* -------------------------------------------------- */
  /* Links & media                                       */
  /* -------------------------------------------------- */
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-inherit hover:text-blue-600"
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

  /* -------------------------------------------------- */
  /* Lists (bullet, ordered)                             */
  /* -------------------------------------------------- */
  ul: ({ children }) => <ul className="list-disc px-4 my-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal px-6 my-2">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,

  /* -------------------------------------------------- */
  /* Code & preformatted blocks                          */
  /* -------------------------------------------------- */
  code: ({ children }) => (
    <code className="font-mono bg-gray-100 rounded px-1">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="rounded overflow-x-auto py-2 bg-gray-100">
      <code>{children}</code>
    </pre>
  ),

  /* -------------------------------------------------- */
  /* Blockquote                                          */
  /* -------------------------------------------------- */
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-400 pl-4 my-2 italic text-gray-500">
      {children}
    </blockquote>
  ),

  /* -------------------------------------------------- */
  /* Tables (GFM)                                        */
  /* -------------------------------------------------- */
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-300 rounded-lg text-sm text-left text-gray-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-gray-50">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-2 font-medium border border-gray-200">{children}</th>
  ),
  td: ({ children }) => <td className="px-4 py-2 border border-gray-200">{children}</td>,
};
