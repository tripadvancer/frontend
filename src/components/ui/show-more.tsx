'use client'

import { FormButton } from '@/components/ui/form-button'

type ShowMoreProps = {
    isLoading?: boolean
    onClick: () => void
}

export const ShowMore = ({ isLoading, onClick }: ShowMoreProps) => {
    return (
        <FormButton type="stroke" shape="rounded" className="w-full" isLoading={isLoading} onClick={onClick}>
            Load more ...
        </FormButton>
    )
}
