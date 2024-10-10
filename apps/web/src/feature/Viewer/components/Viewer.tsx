import dynamic from 'next/dynamic';

const ProseMirrorEditor = dynamic(() => import('./ProseMirror/ProseMirrorEditor'), { ssr: false });

const Viewer= (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <h1>ProseMirror Viewer</h1>
      <ProseMirrorEditor />
    </div>
  );
};

export default Viewer;
