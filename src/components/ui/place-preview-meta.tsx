'use client'

import { useEffect, useRef, useState } from 'react'

import { useLocale } from 'next-intl'

import Link from 'next/link'

import { getCountryByCode } from '@/services/countries'
import { formattedDate } from '@/utils/helpers/common'

type PlacePreviewMetaProps = {
    countryCode: string | null
    createdAt: Date
}

export const PlacePreviewMeta = ({ countryCode, createdAt }: PlacePreviewMetaProps) => {
    const locale = useLocale()
    const country = getCountryByCode(countryCode)

    const countryRef = useRef<HTMLAnchorElement | null>(null)
    const dateRef = useRef<HTMLDivElement | null>(null)
    const [sameLine, setSameLine] = useState(true)

    const recalculateLinePosition = () => {
        if (countryRef.current && dateRef.current) {
            const countryTop = countryRef.current.offsetTop
            const dateTop = dateRef.current.offsetTop
            setSameLine(countryTop === dateTop)
        }
    }

    useEffect(() => {
        recalculateLinePosition()

        window.addEventListener('resize', recalculateLinePosition)
        return () => {
            window.removeEventListener('resize', recalculateLinePosition)
        }
    }, [])

    return (
        <div className="flex flex-wrap gap-x-2 whitespace-normal break-words text-small text-black-40">
            {country && (
                <>
                    <Link
                        ref={countryRef}
                        href={`/countries/${country.slug}`}
                        className="max-w-[150px] truncate text-inherit"
                    >
                        {country.name[locale]}
                    </Link>
                    <div className={!sameLine ? 'invisible' : ''}>•</div>
                </>
            )}
            <div ref={dateRef}>{formattedDate(createdAt, locale)}</div>
        </div>
    )
}
