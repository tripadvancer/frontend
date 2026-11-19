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
                    <div className="text-black-40 absolute -top-7 right-0">
                        {characterCount} / {props.maxLength}
                    </div>
                )}

                <textarea
                    {...rest}
                    ref={ref}
                    className={classNames(
                        'hover-animated placeholder:text-black-40 w-full resize-none rounded-lg border bg-white p-2.5 align-top focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-black-15 hover:border-black-40 focus:border-black-40': !error,
                            'border-red-100': error,
                        },
                    )}
                >
                    {props.value}
                </textarea>
            </div>

            {error && <div className="text-small mt-1 text-red-100">{error}</div>}
        </div>
    )
}
