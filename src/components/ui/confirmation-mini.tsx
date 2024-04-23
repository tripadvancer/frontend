'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

type ConfirmationMiniProps = {
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmationMini = ({ onConfirm, onCancel }: ConfirmationMiniProps) => {
    const t = useI18n()

    return (
        <div className="flex gap-x-1">
            <span>{t('confirm_mini.title')}</span>
            <span className="link-red" onClick={onConfirm}>
                {t('confirm_mini.yes')}
            </span>
            <span>/</span>
            <span className="link-red" onClick={onCancel}>
                {t('confirm_mini.no')}
            </span>
        </div>
    )
}
