'use client'

import { InputHTMLAttributes, useState } from 'react'
import { Ref, forwardRef } from 'react'

import classNames from 'classnames'

import { VisibilityIcon16, VisibilityOffIcon16 } from '@/components/ui/icons'

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    className?: string
    deletable?: boolean
}

const FormInputComponent = (props: FormInputProps, ref: Ref<HTMLInputElement>) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    return (
        <div className={props.className}>
            <div className="relative">
                <input
                    {...props}
                    ref={ref}
                    type={isShowPassword ? 'text' : props.type}
                    className={classNames(
                        'hover-animated h-10 w-full rounded-lg border bg-white px-4 placeholder:text-black-40 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-black-15 hover:border-black-40 focus:border-black-40': !props.error,
                            'border-red-100': props.error,
                            'pr-9': props.type === 'password' || props.deletable,
                        },
                    )}
                />

                {props.type === 'password' && (
                    <div
                        className="hover-animated absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black-15 hover:text-blue-active"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {isShowPassword ? <VisibilityIcon16 /> : <VisibilityOffIcon16 />}
                    </div>
                )}
            </div>

            {props.error && <div className="mt-1 text-small text-red-100">{props.error}</div>}
        </div>
    )
}

export const FormInput = forwardRef(FormInputComponent)
