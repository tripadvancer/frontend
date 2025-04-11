'use client'

import { BoldItalicUnderlineToggles, MDXEditor, MDXEditorProps, toolbarPlugin } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

export const TextEditor = (props: MDXEditorProps) => {
    return (
        <MDXEditor
            {...props}
            plugins={[
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <BoldItalicUnderlineToggles />
                        </>
                    ),
                    toolbarClassName: '!top-16',
                }),
            ]}
            placeholder="Enter place description here..."
            className="p-0!"
        />
    )
}
