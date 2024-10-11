import TipTapEditor from "./TipTap/TipTapEditor";

const Viewer= (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <h1>ProseMirror Viewer</h1>
      <TipTapEditor />
    </div>
  );
};

export default Viewer;
