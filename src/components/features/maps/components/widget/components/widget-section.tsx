'use client'

import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'

type WidgetSectionProps = {
    children: React.ReactNode
    title: string
    variant?: 'blue' | 'orange'
    info?: string
    isExpanded: boolean
    onToggle: () => void
}

export const WidgetSection = ({ children, title, variant, info, isExpanded, onToggle }: WidgetSectionProps) => {
    const renderInfo = () => {
        const colorVariants = {
            blue: 'text-blue-100',
            orange: 'text-orange-100',
        }

        if (info && variant) {
            return <span className={`text-small ${colorVariants[variant]}`}>{info}</span>
        }

        return null
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex cursor-pointer items-center justify-between" onClick={onToggle}>
                <div className="text-caps uppercase">{title}</div>
                <div className="flex items-center justify-center gap-2">
                    {renderInfo()}
                    {isExpanded ? <ChevronBottomIcon16 /> : <ChevronTopIcon16 />}
                </div>
            </div>

            {isExpanded && children}
        </div>
    )
}
