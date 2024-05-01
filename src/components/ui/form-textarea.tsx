'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import classNames from 'classnames'

type FormTextareaProps = {
    id?: string
    name: string
    value: string
    placeholder: string
    autoFocus?: boolean
    maxLength?: number
    error?: string
    className?: string
    isDisabled?: boolean
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const FormTextarea = ({
    id,
    name,
    value,
    placeholder,
    autoFocus,
    maxLength,
    error,
    className,
    isDisabled,
    onChange,
}: FormTextareaProps) => {
    const [characterCount, setCharacterCount] = useState<number>(0)

    useEffect(() => {
        setCharacterCount(value.trim().length)
    }, [value])

    return (
        <div className={className}>
            <div className="relative">
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
                    disabled={isDisabled}
                    onChange={onChange}
                    className={classNames(
                        'hover-animated h-[120px] w-full resize-none rounded-lg border bg-white p-2.5 align-top placeholder:text-black-40 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-red-100': error,
                            'border-black-15 focus:border-black-40': !error,
                        },
                    )}
                >
                    {value}
                </textarea>
            </div>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}
