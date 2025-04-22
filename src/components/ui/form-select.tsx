import { ReactNode, RefObject, useRef, useState } from 'react'

import classNames from 'classnames'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useOnClickOutside } from 'usehooks-ts'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type FormSelectProps = {
    name: string
    placeholder: string
    options: {
        value: string
        label: string
        icon?: ReactNode
    }[]
    disabled?: boolean
    onChange: (value: string) => void
}

export const FormSelect = ({ name, placeholder, options, disabled, onChange }: FormSelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const ref = useRef<HTMLDivElement>(null)

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        setIsOpen(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setIsOpen(false)
    })

    const handleClick = (value: string) => {
        setIsOpen(false)
        onChange(value)
    }

    return (
        <div ref={ref} className="relative">
            <div
                className={classNames(
                    'hover-animated flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-black-15 bg-white px-4 text-black-15 hover:border-black-40 hover:text-black-40 disabled:cursor-no-drop disabled:opacity-30',
                    {
                        'border-black-40 text-black-40': isOpen,
                        'cursor-no-drop opacity-30': disabled,
                    },
                )}
                onClick={() => (disabled ? null : setIsOpen(!isOpen))}
            >
                <div className="text-black-100">{placeholder}</div>
                {isOpen ? (
                    <ChevronUpIcon size={16} absoluteStrokeWidth />
                ) : (
                    <ChevronDownIcon size={16} absoluteStrokeWidth />
                )}
            </div>
            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-40 rounded-lg border bg-white p-1 shadow-small">
                    {options.map(option => (
                        <div
                            key={`select-option-${name}-${option.value}`}
                            className="group hover-animated relative cursor-pointer rounded-md hover:bg-black-5"
                            onClick={() => handleClick(option.value)}
                        >
                            <div className="flex gap-x-2 px-3 py-2">
                                {option.icon && <div className="mt-[3px] text-black-40">{option.icon}</div>}
                                <div className="overflow-hidden">
                                    <div className="hover-animated line-clamp-2 break-words group-hover:text-blue-active">
                                        {option.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
