'use client'

import { PencilIcon, TrashIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { useAppDispatch } from '@/utils/redux/hooks'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { usersAPI } from '@/utils/redux/services/users/users.api'

type UserPlacesItemActionsProps = {
    id: number
    userId: number
}

export const UserPlacesItemActions = ({ id, userId }: UserPlacesItemActionsProps) => {
    const dispatch = useAppDispatch()
    const toast = useToast()
    const router = useRouter()

    const [deletePlace] = placesAPI.useDeletePlaceMutation()

    const handleDelete = async () => {
        try {
            await deletePlace(id).unwrap()
            dispatch(
                usersAPI.util.updateQueryData('getPlacesByUserId', { userId, page: 1 }, draft => {
                    draft.items = draft.items.filter(place => place.id !== id)
                    draft.total = Math.max(0, draft.total - 1)
                }),
            )
            toast.success('The place has been deleted.')
            router.refresh()
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    const items: DropdownItemProps[] = [
        {
            caption: 'Edit',
            value: 'edit',
            icon: <PencilIcon size={16} />,
            onClick: () => router.push(`/places/${id}/edit`),
        },
        {
            caption: 'Delete',
            value: 'delete',
            icon: <TrashIcon size={16} />,
            isRed: true,
            requiredConfirmation: true,
            onClick: handleDelete,
        },
    ]

    return (
        <div className="absolute right-2 top-2 z-10">
            <Dropdown items={items} />
        </div>
    )
}
