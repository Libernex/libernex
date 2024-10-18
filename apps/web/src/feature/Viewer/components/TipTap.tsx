'use client'

import React, { useState } from 'react';
import TipTapEditor from "@/feature/Viewer/components/TipTap/TipTapEditor";
import Viewer from "@/feature/Viewer/components/Viewer";

const TipTap = () => {
    const [content, setContent] = useState('<p>Start editing...</p>');
    const [isEditable, setIsEditable] = useState(true);  // 편집 가능 여부 상태 추가

    // 편집 가능 여부를 토글하는 함수
    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Basic Tiptap Editor</h1>

            {/* 편집 가능 여부 토글 버튼 */}
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={toggleEditable}
            >
                {isEditable ? 'Disable Editing' : 'Enable Editing'}
            </button>

            {/* TipTapEditor 컴포넌트 */}
            <TipTapEditor
                initialContent={content}
                onChangeContent={setContent}
                editable={isEditable}  // 편집 가능 여부 전달
            />

            {/* Viewer 컴포넌트 */}
            <h2 className="text-xl font-semibold mt-6">Current Content:</h2>
            <Viewer content={content} />
        </div>
    );
};

export default TipTap;
