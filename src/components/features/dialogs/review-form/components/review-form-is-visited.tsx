'use client'

import { FormSwitcher } from '@/components/ui/form-switcher'

type ReviewFormIsVisitedProps = {
    isVisited: boolean
    isLoading?: boolean
    onChange: (value: boolean) => void
}

export const ReviewFormIsVisited = ({ isVisited, isLoading, onChange }: ReviewFormIsVisitedProps) => {
    const handleToggleIsVisited = () => {
        onChange(!isVisited)
    }

    return (
        <div className="flex items-center gap-x-2">
            <FormSwitcher checked={isVisited} isDisabled={isLoading} onChange={handleToggleIsVisited} />
            <div className="cursor-pointer" onClick={isLoading ? undefined : handleToggleIsVisited}>
                {'I was here'}
            </div>
        </div>
    )
}
