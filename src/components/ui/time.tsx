'use client'

import { useTranslations } from 'next-intl'

type TimeProps = {
    /**
     * Time in seconds
     */
    time: number
    className?: string
}

export const Time = ({ time, className }: TimeProps) => {
    const t = useTranslations()

    const getTime = (time: number) => {
        if (time >= 3600) {
            const hours = Math.floor(time / 3600)
            const minutes = Math.floor((time % 3600) / 60)
            return `${t('common.time.hours', { hours })} ${t('common.time.minutes', { minutes })}`
        }

        if (time >= 60) {
            const minutes = Math.floor(time / 60)
            return t('common.time.minutes', { minutes })
        }

        return t('common.time.seconds', { seconds: time })
    }

    return <div className={className}>{getTime(time)}</div>
}
