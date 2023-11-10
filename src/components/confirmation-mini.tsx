'use client'

import { useScopedI18n } from '@/utils/i18n/i18n.client'

type ConfirmationMiniProps = {
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmationMini = ({ onConfirm, onCancel }: ConfirmationMiniProps) => {
    const t = useScopedI18n('common')

    return (
        <div className="flex gap-x-1">
            <span>{t('confirm.title')}</span>
            <span className="hover-animated cursor-pointer text-red-100 hover:text-red-active" onClick={onCancel}>
                {t('confirm.no')}
            </span>
            <span>/</span>
            <span className="hover-animated cursor-pointer text-red-100 hover:text-red-active" onClick={onConfirm}>
                {t('confirm.yes')}
            </span>
        </div>
    )
}
