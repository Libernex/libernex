import React from "react";

export default function ChatLayout({
                                       children
}: {
    children: React.ReactNode
}): JSX.Element {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}