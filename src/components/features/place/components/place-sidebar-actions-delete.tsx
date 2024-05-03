'use client'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { Confirmation } from '@/components/ui/confirmation'
import { DeleteIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsDelete = ({ place }: { place: IPlace }) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [deletePlace] = placesAPI.useDeletePlaceMutation()

    const handleClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.delete_place.title')}
                message={t('confirm.delete_place.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await deletePlace(place.id)
                        toast.success(t('success.delete_place'))
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
            {t('place.actions.delete')}
        </div>
    )
}
