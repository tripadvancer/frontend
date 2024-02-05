'use client'

import { useState } from 'react'

import classNames from 'classnames'

type SectionProps = {
    children: React.ReactNode
    title: string
    variant: 'blue' | 'white'
    info?: string
}

export const Section = ({ children, title, variant, info }: SectionProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className={classNames('flex flex-col gap-y-4 rounded-2xl p-4 sm:p-8', {
                'bg-white': variant === 'white',
                'bg-blue-10': variant === 'blue',
            })}
        >
            <div className="flex cursor-pointer items-center justify-between" onClick={handleToggle}>
                <div className="text-caps uppercase">{title}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <div className="text-small text-blue-100">{info}</div>}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames({
                            'rotate-180 transform': isOpen,
                        })}
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.5132 5L14 6.39012L8 12L2 6.39012L3.48679 5L8 9.21976L12.5132 5Z"
                        />
                    </svg>
                </div>
            </div>

            {isOpen && <div>{children}</div>}
        </div>
    )
}
