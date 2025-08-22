'use client'

import { useState } from 'react'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { arrayToString } from '@/utils/helpers/maps'
import { GeoJsonPoint } from '@/utils/types/geo'

type PlaceHeaderCoordinatesProps = {
    location: GeoJsonPoint
}

export const PlaceHeaderCoordinates = ({ location }: PlaceHeaderCoordinatesProps) => {
    const t = useTranslations()
    const toast = useToast()
    const coordinatesString = arrayToString(location.coordinates)

    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (typeof window !== 'undefined' && window.navigator.clipboard) {
            try {
                await window.navigator.clipboard.writeText(coordinatesString)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch {
                toast.error(t('common.error'))
            }
        } else {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="group flex cursor-pointer items-center gap-x-2 text-big text-black-70" onClick={handleCopy}>
            {coordinatesString}
            {copied ? (
                <span className="flex items-center gap-1 text-green-600">
                    <CheckIcon className="h-4 w-4" size={20} /> {t('success.copied')}
                </span>
            ) : (
                <CopyIcon className="rotate-90 text-blue-100 group-hover:text-blue-active" size={20} />
            )}
        </div>
    )
}
