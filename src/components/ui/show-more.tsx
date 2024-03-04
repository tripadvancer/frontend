'use client'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

type ShowMoreProps = {
    isLoading?: boolean
    onClick: () => void
}

export const ShowMore = ({ isLoading, onClick }: ShowMoreProps) => {
    const t = useI18n()

    return (
        <FormButton type="stroke" shape="rounded" className="w-full" isLoading={isLoading} onClick={onClick}>
            {t('common.action.load_more')}
        </FormButton>
    )
}
