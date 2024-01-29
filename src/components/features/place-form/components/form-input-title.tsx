'use client'

import { useEffect, useRef } from 'react'

type FormInputTitleProps = {
    value: string
    onChange: (value: string) => void
}

export const FormInputTitle = ({ value, onChange }: FormInputTitleProps) => {
    const contentEditableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentEditableRef.current && contentEditableRef.current.textContent !== value) {
            contentEditableRef.current.textContent = value
        }
    }, [value])

    return (
        <div
            ref={contentEditableRef}
            contentEditable="true"
            className="relative w-full text-center text-h1-m text-white placeholder:text-white before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:transform focus:outline-none sm:text-h1"
            onInput={(e: React.FormEvent<HTMLDivElement>) => onChange(e.currentTarget.textContent || '')}
            data-placeholder="Place name"
        />
    )
}
