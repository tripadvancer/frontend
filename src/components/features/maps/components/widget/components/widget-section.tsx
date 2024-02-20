'use client'

import { IconChevron } from '@/components/ui/icon-chevron'

type WidgetSectionProps = {
    children: React.ReactNode
    title: string
    variant?: 'blue' | 'orange'
    info?: string
    isExpanded: boolean
    onToggle: () => void
}

export const WidgetSection = ({ children, title, variant, info, isExpanded, onToggle }: WidgetSectionProps) => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex cursor-pointer items-center justify-between" onClick={onToggle}>
                <div className="text-caps uppercase">{title}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <span className={`text-small text-${variant}-100`}>{info}</span>}
                    <IconChevron position={isExpanded ? 'down' : 'up'} />
                </div>
            </div>

            {isExpanded && children}
        </div>
    )
}
