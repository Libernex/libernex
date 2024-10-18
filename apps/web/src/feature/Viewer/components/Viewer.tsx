import React from 'react';

type ViewerProps = {
    content: string;
};

const Viewer = ({ content }: ViewerProps) => {
    return (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default Viewer;
