'use client'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'

type ShowMoreProps = {
    isLoading?: boolean
    onClick: () => void
}

export const ShowMore = ({ isLoading, onClick }: ShowMoreProps) => {
    const t = useTranslations()

    return (
        <FormButton type="stroke" shape="rounded" className="w-full" isLoading={isLoading} onClick={onClick}>
            {t('common.action.loadMore')}
        </FormButton>
    )
}
