'use client'

import { useScopedI18n } from '@/utils/i18n.client'

type ShowMoreProps = {
    onClick: () => void
}

export const ShowMore = ({ onClick }: ShowMoreProps) => {
    const t = useScopedI18n('common.cta')

    return (
        <button
            className="hover-animated border-blue-20 hover:border-blue-active hover:text-blue-active h-10 w-full rounded-full border text-center font-medium text-blue-100"
            onClick={onClick}
        >
            {t('show_more')}
        </button>
    )
}
