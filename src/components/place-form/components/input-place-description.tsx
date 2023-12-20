'use client'

import { Editor, EditorState } from 'draft-js'

type InputPlaceDescriptionProps = {
    value: EditorState
    onChange: (editorState: EditorState) => void
}

export const InputPlaceDescription = ({ value, onChange }: InputPlaceDescriptionProps) => {
    return (
        <div className="flex-1 text-big">
            <Editor editorState={value} onChange={onChange} />
        </div>
    )
}
