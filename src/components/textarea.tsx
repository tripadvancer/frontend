'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames'

type InputProps = {
    id?: string
    name: string
    value: string
    placeholder: string
    autoFocus?: boolean
    maxLength?: number
    error?: string
    className?: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea = ({
    id,
    name,
    value,
    placeholder,
    autoFocus,
    maxLength,
    error,
    className,
    onChange,
}: InputProps) => {
    const [characterCount, setCharacterCount] = useState<number>(0)

    useEffect(() => {
        setCharacterCount(value?.length)
    }, [value])

    return (
        <div className={classNames('relative', className)}>
            {maxLength && (
                <div className="absolute -top-7 right-0 text-black-40">
                    {characterCount} / {maxLength}
                </div>
            )}

            <textarea
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                autoFocus={autoFocus}
                maxLength={maxLength}
                onChange={onChange}
                className={classNames(
                    'hover-animated h-[120px] w-full resize-none rounded-lg border bg-white p-2.5 placeholder:text-black-40 focus:outline-none',
                    {
                        'border-red-100': error,
                        'border-black-15 focus:border-black-40': !error,
                    },
                )}
            >
                {value}
            </textarea>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}
