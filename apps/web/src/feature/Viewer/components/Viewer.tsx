'use client';

import React from 'react';
import { useMarkdown } from '../hooks/useMarkdown';
import ProseEditor from './ProseMirror/ProseEditor';
import ProseViewer from './ProseMirror/ProseViewer';

const Viewer= (): JSX.Element => {
  const { markdown, setMarkdown } = useMarkdown();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">ProseMirror Markdown Viewer & Editor</h1>
      
      <div className="my-4">
        <ProseEditor markdown={markdown} setMarkdown={setMarkdown} />
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold">Read-Only Markdown Viewer</h2>
        <ProseViewer markdown={markdown} />
      </div>
    </div>
  );
};

export default Viewer;
