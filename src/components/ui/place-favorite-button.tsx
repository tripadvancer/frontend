'use client'

import { ButtonIcon } from '@/components/ui/button-icon'
import { useToggleFavorite } from '@/utils/hooks/use-toggle-favorite'

type PlaceFavoriteButtonProps = {
    id: number
    size?: 'small' | 'medium'
    isFavorite: boolean
}

export const PlaceFavoriteButton = ({ id, size, isFavorite }: PlaceFavoriteButtonProps) => {
    const { isLoading, toggleFavorite } = useToggleFavorite(id, isFavorite)

    return (
        <ButtonIcon size={size} isLoading={isLoading} onClick={toggleFavorite}>
            <svg
                width={size === 'small' ? 16 : 24}
                height={size === 'small' ? 16 : 24}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={
                        isFavorite
                            ? 'M5 22L12 18.6049L19 22V3.94005C19 2.86859 18.1046 2 17 2H7C5.89543 2 5 2.86859 5 3.94005V22Z'
                            : 'M5 22L12 18.6049L19 22V3.94005C19 2.86859 18.1046 2 17 2H7C5.89543 2 5 2.86859 5 3.94005V22ZM12 16.4359L7 18.8609V3.94005H17V18.8609L12 16.4359Z'
                    }
                />
            </svg>
        </ButtonIcon>
    )
}
