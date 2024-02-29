import { useEffect, useRef } from 'react'

import classNames from 'classnames'

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
            onChange(text)
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
            className={classNames(
                'relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:cursor-text before:text-nowrap focus:outline-none',
                className,
            )}
            onInput={handleInput}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            data-placeholder={placeholder}
        />
    )
}
