'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { Confirmation } from '@/components/ui/confirmation'
import { DeleteIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'

export const PlaceSidebarActionsDelete = ({ place }: { place: IPlace }) => {
    const t = useTranslations()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [deletePlace] = placesAPI.useDeletePlaceMutation()

    const handleClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirmation.deletePlace.title')}
                message={t('confirmation.deletePlace.text')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await deletePlace(place.id)
                        toast.success(t('success.deletePlace'))
                        router.push('/')
                        router.refresh()
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    return (
        <div className="link-red flex items-center gap-x-2 align-top" onClick={handleClick}>
            <DeleteIcon24 />
            {t('common.action.place.delete')}
        </div>
    )
}
