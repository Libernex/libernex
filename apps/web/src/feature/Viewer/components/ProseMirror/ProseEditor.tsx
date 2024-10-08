import React, { useEffect, useRef, useCallback } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema,defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { exampleSetup } from 'prosemirror-example-setup';

interface ProseEditorProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

const ProseEditor: React.FC<ProseEditorProps> = React.memo(({ markdown, setMarkdown }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  const createEditor = useCallback(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: defaultMarkdownParser.parse(markdown),
        schema,
        plugins: exampleSetup({ schema }),
      });

      editorViewRef.current = new EditorView(editorRef.current, {
        state,
        dispatchTransaction(transaction) {
          const newState = editorViewRef.current!.state.apply(transaction);
          editorViewRef.current!.updateState(newState);

          const newMarkdown = defaultMarkdownSerializer.serialize(newState.doc);
          setMarkdown(newMarkdown);
        },
      });
    }
  }, [setMarkdown]);

  useEffect(() => {
    createEditor();

    return () => {
      editorViewRef.current?.destroy();
    };
  }, [createEditor]);

  useEffect(() => {
    if (editorViewRef.current && markdown !== defaultMarkdownSerializer.serialize(editorViewRef.current.state.doc)) {
      const state = EditorState.create({
        doc: defaultMarkdownParser.parse(markdown),
        schema,
        plugins: exampleSetup({ schema }),
      });
      editorViewRef.current.updateState(state);
    }
  }, [markdown]);

  return <div ref={editorRef} className="p-4 border rounded"></div>;
});

export default ProseEditor;
