'use client'

import { InputHTMLAttributes, useState } from 'react'
import { Ref, forwardRef } from 'react'

import classNames from 'classnames'

import { DeleteIcon16, VisibilityIcon16, VisibilityOffIcon16 } from '@/components/ui/icons'

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    className?: string
    onDelete?: () => void
}

const FormInputComponent = (props: FormInputProps, ref: Ref<HTMLInputElement>) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const { onDelete, error, className, ...inputProps } = props

    return (
        <div className={className}>
            <div className="relative">
                <input
                    {...inputProps}
                    ref={ref}
                    type={isShowPassword ? 'text' : props.type}
                    className={classNames(
                        'hover-animated h-10 w-full rounded-lg border bg-white px-4 placeholder:text-black-40 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-black-15 hover:border-black-40 focus:border-black-40': !error,
                            'border-red-100': error,
                            'pr-9': props.type === 'password' || onDelete,
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

                {onDelete && (
                    <div
                        className={classNames('absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-red-100', {
                            'cursor-no-drop opacity-30': props.disabled,
                        })}
                        onClick={() => (props.disabled ? null : onDelete)}
                    >
                        <DeleteIcon16 />
                    </div>
                )}
            </div>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}

export const FormInput = forwardRef(FormInputComponent)
