'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames'

import { ActionControl } from '@/components/action-control'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useOnClickOutside } from '@/utils/hooks/use-on-click-outside'
import { useScopedI18n } from '@/utils/i18n/i18n.client'

export type DropdownItemProps = {
    caption: string
    icon?: React.ReactNode
    value: string
    isRed?: boolean
    isCurrent?: boolean
    requiredConfirmation?: boolean
    onClick: () => void
}

type DropdownProps = {
    items: DropdownItemProps[]
    children?: React.ReactNode
    currentItem?: string
}

export const Dropdown = ({ children, items, currentItem }: DropdownProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState<boolean>(false)

    useOnClickOutside(ref, () => {
        setVisible(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setVisible(false)
    })

    const handleClick = (item: DropdownItemProps) => {
        setVisible(false)
        item.onClick()
    }

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setVisible(!visible)}>
                {children ? children : <ActionControl isActivated={visible} />}
            </div>
            {visible && (
                <ul className="absolute right-0 top-full w-40 rounded-lg bg-white p-1.5 shadow-medium">
                    {items.map(item => (
                        <DropdownItem
                            key={item.value}
                            {...item}
                            isCurrent={item.value === currentItem}
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

const DropdownItem = (props: DropdownItemProps) => {
    const [isConfirm, setIsConfirm] = useState<boolean>(false)

    const handleClick = () => {
        props.requiredConfirmation ? setIsConfirm(true) : props.onClick()
    }

    const handleCancel = () => {
        setIsConfirm(false)
    }

    const handleConfirm = () => {
        setIsConfirm(false)
        props.onClick()
    }

    if (isConfirm) {
        return <DropdownItemConfirm onCancel={handleCancel} onConfirm={handleConfirm} />
    }

    return <DropdownItemRegular {...props} onClick={handleClick} />
}

const DropdownItemRegular = ({ caption, icon, isCurrent, isRed, onClick }: DropdownItemProps) => {
    return (
        <li
            className={classNames(
                'hover-animated flex cursor-pointer items-center gap-x-2 rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10',
                {
                    'font-medium': isCurrent,
                    'text-red-100': isRed,
                },
            )}
            onClick={onClick}
        >
            {icon}
            {caption}
        </li>
    )
}

const DropdownItemConfirm = ({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) => {
    const t = useScopedI18n('common')

    return (
        <li className="hover-animated flex items-center gap-x-1 rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10">
            <span>{t('confirm.title')}</span>
            <span className="hover-animated cursor-pointer text-red-100 hover:text-red-active" onClick={onCancel}>
                {t('confirm.no')}
            </span>
            <span>/</span>
            <span className="hover-animated cursor-pointer text-red-100 hover:text-red-active" onClick={onConfirm}>
                {t('confirm.yes')}
            </span>
        </li>
    )
}
