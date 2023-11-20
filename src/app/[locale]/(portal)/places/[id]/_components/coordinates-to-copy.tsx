'use client'

import classNames from 'classnames'

import type { CoordinatesTuple } from '@/utils/types/geo'

import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type CoordinatesToCopyProps = {
    coordinates: CoordinatesTuple
    className?: string
}

export const CoordinatesToCopy = ({ coordinates, className }: CoordinatesToCopyProps) => {
    const t = useI18n()
    const toast = useToast()

    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(`${coordinates[1]}, ${coordinates[0]}`)
            toast.success(t('coordinates.copy.success'))
        }
    }

    return (
        <div
            className={classNames('inline-flex cursor-pointer gap-2 text-big text-white', className)}
            onClick={handleCopy}
        >
            {coordinates[1].toFixed(5)}, {coordinates[0].toFixed(5)}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M10 3H19C20.1523 3 21 3.84772 21 5V14C21 15.1523 20.1523 16 19 16H16V19C16 20.1523 15.1523 21 14 21H5C3.84772 21 3 20.1523 3 19V10C3 8.84772 3.84772 8 5 8H8V5C8 3.84772 8.84772 3 10 3ZM8 10H5V19H14V16H10C8.84772 16 8 15.1523 8 14V10ZM10 5V14H19V5H10Z"
                />
            </svg>
        </div>
    )
}
