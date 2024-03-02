'use client'

import { useState } from 'react'

import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'

type WidgetSectionProps = {
    children: React.ReactNode
    title: string
    variant: 'blue' | 'orange'
    info?: string
}

export const WidgetSection = ({ children, title, variant, info }: WidgetSectionProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const infoColorVariants = {
        blue: 'text-blue-100',
        orange: 'text-orange-100',
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="text-caps uppercase">{title}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <span className={`text-small ${infoColorVariants[variant]}`}>{info}</span>}
                    {isExpanded ? <ChevronTopIcon16 /> : <ChevronBottomIcon16 />}
                </div>
            </div>

            {isExpanded && children}
        </div>
    )
}
