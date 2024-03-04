'use client'

import { ChangeEvent, useState } from 'react'

import classNames from 'classnames'

import { VisibilityIcon16, VisibilityOffIcon16 } from '@/components/ui/icons'

type FormInputProps = {
    id?: string
    type: 'text' | 'password'
    name: string
    value: string
    placeholder: string
    autoFocus?: boolean
    error?: string
    className?: string
    isDisabled?: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
    type,
    name,
    value,
    placeholder,
    autoFocus,
    error,
    className,
    isDisabled,
    onChange,
}: FormInputProps) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    return (
        <div className={className}>
            <div className="relative">
                <input
                    type={isShowPassword ? 'text' : type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    disabled={isDisabled}
                    onChange={onChange}
                    className={classNames(
                        'hover-animated h-10 w-full rounded-lg border bg-white pl-4 pr-4 placeholder:text-black-40 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                        {
                            'border-red-100': error,
                            'border-black-15 focus:border-black-40': !error,
                            'pr-9': type === 'password',
                        },
                    )}
                />

                {type === 'password' && (
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
