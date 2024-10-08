import React, { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {schema, defaultMarkdownParser, defaultMarkdownSerializer} from "prosemirror-markdown"
import {exampleSetup} from "prosemirror-example-setup"

interface ProseViewerProps {
  markdown: string;
}

const ProseViewer: React.FC<ProseViewerProps> = React.memo(({ markdown }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (viewerRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: defaultMarkdownParser.parse(markdown),
        plugins: exampleSetup({schema})
      });

      editorViewRef.current = new EditorView(viewerRef.current, {
        state,
        editable: () => false,
      });
    }

    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  }, []); // 빈 의존성 배열로 초기 마운트 시에만 실행

  useEffect(() => {
    if (editorViewRef.current) {
      const state = EditorState.create({
        doc: defaultMarkdownParser.parse(markdown),
        schema,
      });
      editorViewRef.current.updateState(state);
    }
  }, [markdown]);

  return <div ref={viewerRef} className="p-4 border rounded bg-gray-100"></div>;
});

export default ProseViewer;
