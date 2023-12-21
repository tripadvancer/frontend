'use client'

import { useState } from 'react'

import { Editor, EditorState } from 'draft-js'

type InputPlaceDescriptionProps = {
    value: string
    onChange: (value: string | null) => void
}

export const InputPlaceDescription = ({ value, onChange }: InputPlaceDescriptionProps) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    return (
        <div className="flex-1 text-big">
            <Editor editorState={editorState} onChange={setEditorState} />
        </div>
    )
}
