import { useState } from 'react';

export const useMarkdown = () => {
  const [markdown, setMarkdown] = useState<string>(`
# Hello ProseMirror
This is a simple markdown editor.
`);

  return {
    markdown,
    setMarkdown,
  };
};
