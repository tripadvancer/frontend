'use client'

import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { useAppDispatch } from '@/utils/redux/hooks'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { usersAPI } from '@/utils/redux/services/users/users.api'

type UserPlacesItemActionsProps = {
    id: number
    userId: number
}

export const UserPlacesItemActions = ({ id, userId }: UserPlacesItemActionsProps) => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const toast = useToast()
    const router = useRouter()

    const [deletePlace] = placesAPI.useDeletePlaceMutation()

    const handleDelete = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirmation.deletePlace.title')}
                message={t('confirmation.deletePlace.text')}
                onConfirm={async () => {
                    dialog.close()

                    try {
                        await deletePlace(id).unwrap()
                        dispatch(
                            usersAPI.util.updateQueryData('getPlacesByUserId', { userId, page: 1 }, draft => {
                                draft.items = draft.items.filter(place => place.id !== id)
                                draft.total = Math.max(0, draft.total - 1)
                            }),
                        )
                        toast.success(t('success.deletePlace'))
                        router.refresh()
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    return (
        <div className="absolute right-2 top-2 z-10 flex gap-x-1">
            <Link
                href={`/places/${id}/edit`}
                aria-label={t('common.action.place.edit')}
                title={t('common.action.place.edit')}
                className="flex-center size-8 rounded-lg bg-white text-black-100 shadow-black hover:text-blue-active"
            >
                <PencilIcon size={16} />
            </Link>
            <button
                type="button"
                onClick={handleDelete}
                aria-label={t('common.action.place.delete')}
                title={t('common.action.place.delete')}
                className="flex-center size-8 rounded-lg bg-white text-black-100 shadow-black hover:text-red-100"
            >
                <Trash2Icon size={16} />
            </button>
        </div>
    )
}
