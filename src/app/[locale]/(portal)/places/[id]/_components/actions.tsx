'use client'

import type { IPlace } from '@/utils/types/place'

import { ButtonIcon } from '@/components/forms/button-icon/button-icon'
import { Button } from '@/components/forms/button/button'
import { ToggleFavoriteButton } from '@/components/toggle-favorite-button'
import { navigateToLocation } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

type ActionsProps = IPlace

export const Actions = (place: ActionsProps) => {
    const t = useI18n()

    const handleNavigateToLocation = () => {
        navigateToLocation(place.location.coordinates[1], place.location.coordinates[0])
    }

    return (
        <div className="flex gap-x-2">
            <Button className="flex-auto" onClick={handleNavigateToLocation}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M6 22C7.30622 22 8.41746 21.1937 8.82929 20.0683H16.5C18.9853 20.0683 21 18.1224 21 15.722C21 13.3216 18.9853 11.3756 16.5 11.3756H7.5C6.11929 11.3756 5 10.2946 5 8.96101C5 7.62744 6.11929 6.54638 7.5 6.54638L10.1716 6.54636L8.87868 7.79511L10.2929 9.16103L14 5.58051L10.2929 2L8.87868 3.36592L10.1716 4.61466L7.5 4.61468C5.01472 4.61468 3 6.56059 3 8.96101C3 11.3614 5.01472 13.3073 7.5 13.3073H16.5C17.8807 13.3073 19 14.3884 19 15.722C19 17.0555 17.8807 18.1366 16.5 18.1366H8.82929C8.41746 17.0112 7.30622 16.2049 6 16.2049C4.34315 16.2049 3 17.5022 3 19.1024C3 20.7027 4.34315 22 6 22ZM5 19.1024C5 18.569 5.44772 18.1366 6 18.1366C6.55228 18.1366 7 18.569 7 19.1024C7 19.6359 6.55228 20.0683 6 20.0683C5.44772 20.0683 5 19.6359 5 19.1024Z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M18 2.68297C19.6569 2.68297 21 3.98025 21 5.58053C21 7.1808 19.6569 8.47808 18 8.47808C16.3431 8.47808 15 7.1808 15 5.58053C15 3.98025 16.3431 2.68297 18 2.68297ZM17 5.58053C17 5.0471 17.4477 4.61468 18 4.61468C18.5523 4.61468 19 5.0471 19 5.58053C19 6.11395 18.5523 6.54638 18 6.54638C17.4477 6.54638 17 6.11395 17 5.58053Z"
                    />
                </svg>
                {t('place.navigation')}
            </Button>
            <ButtonIcon onClick={() => alert('Don`t implemented yet')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M12 4.94132C14.7614 4.94132 17 7.14705 17 9.86796C17 12.5889 14.7614 14.7946 12 14.7946C9.23858 14.7946 7 12.5889 7 9.86796C7 7.14705 9.23858 4.94132 12 4.94132ZM9 9.86796C9 8.23541 10.3431 6.91197 12 6.91197C13.6569 6.91197 15 8.23541 15 9.86796C15 11.5005 13.6569 12.8239 12 12.8239C10.3431 12.8239 9 11.5005 9 9.86796Z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M12 23L12.6577 22.4341C18.1887 17.6754 21 13.5203 21 9.86796C21 4.69564 16.9029 1 12 1C7.09705 1 3 4.69564 3 9.86796C3 13.5203 5.81131 17.6754 11.3423 22.4341L12 23ZM12 20.3749C7.30661 16.2071 5 12.6754 5 9.86796C5 5.82476 8.16411 2.97066 12 2.97066C15.8359 2.97066 19 5.82476 19 9.86796C19 12.6754 16.6934 16.2071 12 20.3749Z"
                    />
                </svg>
            </ButtonIcon>
            <ToggleFavoriteButton {...place} />
        </div>
    )
}
