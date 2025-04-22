'use client'

import { Ref, TextareaHTMLAttributes, useEffect, useState } from 'react'

import classNames from 'classnames'

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: Ref<HTMLTextAreaElement | null>
    error?: string
    className?: string
}

export const FormTextarea = (props: FormTextareaProps) => {
    const [characterCount, setCharacterCount] = useState<number>(0)

    const { ref, error, className, ...rest } = props

    useEffect(() => {
        if (typeof props.value === 'string') {
            setCharacterCount(props.value.trim().length)
        }
    }, [props.value])

    return (
        <div className={className}>
            <div className="relative">
                {props.maxLength && (
                    <div className="absolute -top-7 right-0 text-black-40">
                        {characterCount} / {props.maxLength}
                    </div>
                )}

                <textarea
                    {...rest}
                    ref={ref}
                    className={classNames(
                        'hover-animated w-full resize-none rounded-lg border bg-white p-2.5 align-top placeholder:text-black-40 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-black-15 hover:border-black-40 focus:border-black-40': !error,
                            'border-red-100': error,
                        },
                    )}
                >
                    {props.value}
                </textarea>
            </div>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}
