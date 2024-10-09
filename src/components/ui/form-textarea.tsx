'use client'

import { Ref, TextareaHTMLAttributes, forwardRef, useEffect, useState } from 'react'

import classNames from 'classnames'

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string
    className?: string
}

const FormTextareaComponent = (props: FormTextareaProps, ref: Ref<HTMLTextAreaElement>) => {
    const [characterCount, setCharacterCount] = useState<number>(0)

    useEffect(() => {
        if (typeof props.value === 'string') {
            setCharacterCount(props.value.trim().length)
        }
    }, [props.value])

    return (
        <div className={props.className}>
            <div className="relative">
                {props.maxLength && (
                    <div className="absolute -top-7 right-0 text-black-40">
                        {characterCount} / {props.maxLength}
                    </div>
                )}

                <textarea
                    {...props}
                    ref={ref}
                    className={classNames(
                        'hover-animated w-full resize-none rounded-lg border bg-white p-2.5 align-top placeholder:text-black-40 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-black-15 hover:border-black-40 focus:border-black-40': !props.error,
                            'border-red-100': props.error,
                        },
                    )}
                >
                    {props.value}
                </textarea>
            </div>

            {props.error && <div className="mt-1 text-small text-red-100">{props.error}</div>}
        </div>
    )
}

export const FormTextarea = forwardRef(FormTextareaComponent)
