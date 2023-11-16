'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

type ShowMoreProps = {
    onClick: () => void
}

export const ShowMore = ({ onClick }: ShowMoreProps) => {
    const t = useI18n()

    return (
        <button
            className="hover-animated h-10 w-full rounded-full border border-blue-20 text-center font-medium text-blue-100 hover:border-blue-active hover:text-blue-active"
            onClick={onClick}
        >
            {t('common.action.show_more')}
        </button>
    )
}
