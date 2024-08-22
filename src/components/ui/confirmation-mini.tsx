'use client'

import { useTranslations } from 'next-intl'

type ConfirmationMiniProps = {
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmationMini = ({ onConfirm, onCancel }: ConfirmationMiniProps) => {
    const t = useTranslations()

    return (
        <div className="flex gap-x-1">
            <span>{t('component.confirmMini.title')}</span>
            <span className="link-red" onClick={onConfirm}>
                {t('component.confirmMini.yes')}
            </span>
            <span>/</span>
            <span className="link-red" onClick={onCancel}>
                {t('component.confirmMini.no')}
            </span>
        </div>
    )
}
