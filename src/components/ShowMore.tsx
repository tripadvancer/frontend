'use client'

import { useScopedI18n } from "@/utils/i18n.client"

type ShowMoreProps = {
    onClick: () => void
}

export const ShowMore = ({ onClick }: ShowMoreProps) => {
    const t = useScopedI18n('common.cta')

    return (
        <button
            className="box-border h-10 w-full rounded-full border border-custom-black-15 text-center text-sm text-custom-blue-100 hover-animated hover:text-custom-blue-active"
            onClick={onClick}
        >
            {t('show_more')}
        </button>
    )
}
