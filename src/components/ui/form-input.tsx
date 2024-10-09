'use client'

import { InputHTMLAttributes, useState } from 'react'
import { Ref, forwardRef } from 'react'

import classNames from 'classnames'

import { VisibilityIcon16, VisibilityOffIcon16 } from '@/components/ui/icons'

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    className?: string
}

const FormInputComponent = (props: FormInputProps, ref: Ref<HTMLInputElement>) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const { error, className, ...inputProps } = props

    return (
        <div>
            <div
                className={classNames(
                    'hover-animated relative h-10 w-full rounded-lg border bg-white px-4',
                    className,
                    {
                        'border-red-100': error,
                        'hover:border-black-40 has-[:focus]:border-black-40': !error,
                        'cursor-no-drop opacity-30': props.disabled,
                        'pr-9': props.type === 'password',
                    },
                )}
            >
                <input
                    {...inputProps}
                    ref={ref}
                    type={isShowPassword ? 'text' : props.type}
                    className="h-full w-full bg-transparent placeholder:text-black-40 focus:outline-none"
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

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}

export const FormInput = forwardRef(FormInputComponent)
