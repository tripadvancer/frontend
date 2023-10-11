'use client'

import { useState } from 'react'

import classNames from 'classnames'

type InputProps = {
    type: 'text' | 'password'
    name: string
    value: string
    placeholder: string
    autoFocus?: boolean
    error?: string
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ type, name, value, placeholder, autoFocus, error, className, onChange }: InputProps) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const handleTogglePassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const borderClass = error ? 'border-custom-red-100' : 'border-custom-black-15 focus:border-custom-black-40'

    return (
        <div className={classNames(className, 'relative')}>
            <input
                type={isShowPassword ? 'text' : type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChange={onChange}
                className={classNames(
                    borderClass,
                    type === 'password' && 'pr-9',
                    'h-10 w-full rounded-lg border bg-white pl-4 pr-4 text-sm transition-colors duration-300 ease-in-out placeholder:text-custom-black-40 focus:outline-none',
                )}
            />

            {type === 'password' && (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames(
                        isShowPassword ? 'text-custom-blue-active' : 'text-custom-black-15',
                        'absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-300 ease-in-out hover:text-custom-blue-active',
                    )}
                    onClick={handleTogglePassword}
                >
                    <path
                        fillRule="evenodd"
                        d="M2.63603 2.56524L6.62204 6.55043C6.98075 6.20934 7.46593 6 8 6C9.10457 6 10 6.89543 10 8C10 8.53407 9.79066 9.01925 9.44957 9.37796L13.364 13.2929C13.7244 13.6534 13.7522 14.2206 13.4472 14.6129L13.364 14.7071C12.9734 15.0976 12.3403 15.0976 11.9498 14.7071L10.7459 13.506C9.89181 13.834 8.97584 14 8 14C4.80071 14 2.24492 12.2161 0.403752 8.78526L0.233239 8.45879L0 8L0.233239 7.54121C0.773283 6.47891 1.37811 5.56507 2.04579 4.80341L1.22183 3.97944C0.831306 3.58893 0.831299 2.95578 1.22181 2.56526C1.61234 2.17473 2.2455 2.17472 2.63603 2.56524ZM2.4376 7.67718L2.25342 8.00001L2.41061 8.27683C3.89078 10.8123 5.73693 12 8.00021 12C8.39067 12 8.76871 11.9647 9.13461 11.8931L3.46198 6.21921C3.10274 6.64222 2.76145 7.12765 2.4376 7.67718ZM8.00021 2C11.1995 2 13.7553 3.78386 15.5965 7.21474L15.767 7.54121L16.0002 8L15.767 8.45879C15.2448 9.48591 14.6621 10.3742 14.0205 11.1204L12.6029 9.70404C13.0069 9.21689 13.3881 8.64968 13.747 8C12.241 5.27405 10.3443 4 8.00021 4C7.65206 4 7.31379 4.0281 6.9852 4.08489L5.35645 2.45566C6.1813 2.15303 7.06315 2 8.00021 2Z"
                    />
                </svg>
            )}

            {error && <div className="mt-1 text-xs text-custom-red-100">{error}</div>}
        </div>
    )
}
