'use client'

import { InputHTMLAttributes, useState } from 'react'
import { Ref } from 'react'

import classNames from 'classnames'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement | null>
    error?: string
    className?: string
}

export const FormInput = (props: FormInputProps) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const { ref, error, className, ...rest } = props

    return (
        <div>
            <div
                className={classNames('hover-animated relative h-10 w-full rounded-lg border bg-white', className, {
                    'border-red-100': error,
                    'hover:border-black-40 has-[:focus]:border-black-40': !error,
                    'cursor-no-drop opacity-30': props.disabled,
                })}
            >
                <input
                    {...rest}
                    ref={ref}
                    type={isShowPassword ? 'text' : props.type}
                    className={classNames(
                        'placeholder:text-black-40 h-full w-full rounded-lg bg-transparent px-4 focus:outline-none',
                        {
                            'pr-9': props.type === 'password',
                        },
                    )}
                />

                {props.type === 'password' && (
                    <div
                        className="hover-animated text-black-15 hover:text-blue-active absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {isShowPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                    </div>
                )}
            </div>

            {error && <div className="text-small mt-1 text-red-100">{error}</div>}
        </div>
    )
}
