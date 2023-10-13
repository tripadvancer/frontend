'use client'

import { useScopedI18n } from '@/utils/i18n.client'

type ShowMoreProps = {
    onClick: () => void
}

export const ShowMore = ({ onClick }: ShowMoreProps) => {
    const t = useScopedI18n('common.cta')

    return (
        <button
            className="hover-animated h-10 w-full rounded-full border border-custom-blue-20 text-center text-sm font-medium text-custom-blue-100 hover:border-custom-blue-active hover:text-custom-blue-active"
            onClick={onClick}
        >
            {t('show_more')}
        </button>
    )
}
