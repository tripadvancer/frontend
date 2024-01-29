import { useEffect, useRef } from 'react'

type FormContentEditableProps = {
    value: string
    className?: string
    placeholder?: string
    onChange: (value: string) => void
}

export const FormContentEditable = ({ value, className, placeholder, onChange }: FormContentEditableProps) => {
    const contentEditableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentEditableRef.current && contentEditableRef.current.textContent !== value) {
            contentEditableRef.current.textContent = value
        }
    }, [value])

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const text = e.currentTarget.textContent || ''
        onChange(text)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        const text = e.clipboardData.getData('text')
        if (contentEditableRef.current) {
            contentEditableRef.current.innerText = text || ''
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Prevent line/paragraph breaks on 'Enter' key
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <div
            ref={contentEditableRef}
            suppressContentEditableWarning
            contentEditable
            spellCheck={false}
            className={className}
            onInput={handleInput}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            data-placeholder={placeholder}
        />
    )
}
