'use client';

import React from 'react';
import ProseMirrorEditor from './ProseMirror/ProseMirrorEditor';

const Viewer= (): JSX.Element => {

  return (
    <div>
      <h1>ProseMirror Viewer</h1>
      <ProseMirrorEditor />
    </div>
  );
};

export default Viewer;
