'use client'

import { useState } from 'react'

import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'

type WidgetSectionProps = {
    children: React.ReactNode
    title: string
    variant: 'blue' | 'orange'
    info?: string
    isOpened: boolean
    onToggle: () => void
}

export const WidgetSection = ({ children, title, variant, info, isOpened, onToggle }: WidgetSectionProps) => {
    const infoColorVariants = {
        blue: 'text-blue-100',
        orange: 'text-orange-100',
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex cursor-pointer items-center justify-between" onClick={onToggle}>
                <div className="text-caps uppercase">{title}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <span className={`text-small ${infoColorVariants[variant]}`}>{info}</span>}
                    {isOpened ? <ChevronTopIcon16 /> : <ChevronBottomIcon16 />}
                </div>
            </div>

            {isOpened && children}
        </div>
    )
}
