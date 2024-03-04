'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Confirmation } from '@/components/ui/confirmation'
import { DeleteIcon24, EditIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarUserActionsPrivate = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [deletePlace] = placesAPI.useDeletePlaceMutation()

    const handleDeleteClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.delete_place.title')}
                message={t('confirm.delete_place.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await deletePlace(placeId)
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
        <ul className="flex flex-col gap-y-2 text-big-bold">
            <li className="flex" onClick={handleDeleteClick}>
                <span className="link-red inline-flex gap-x-2">
                    <DeleteIcon24 />
                    {t('place.user_actions.delete')}
                </span>
            </li>
            <li className="flex">
                <Link href={`/places/${placeId}/edit`} className="link inline-flex gap-x-2">
                    <EditIcon24 />
                    {t('place.user_actions.edit')}
                </Link>
            </li>
        </ul>
    )
}
