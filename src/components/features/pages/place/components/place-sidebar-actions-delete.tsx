'use client'

import { Trash2Icon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { placesAPI } from '@/utils/redux/services/places/places.api'

type PlaceSidebarActionsDeleteProps = {
    id: number
}

export const PlaceSidebarActionsDelete = ({ id }: PlaceSidebarActionsDeleteProps) => {
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [deletePlace] = placesAPI.useDeletePlaceMutation()

    const handleClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={'Delete place'}
                message={
                    'Are you sure you want to delete this place and all data associated with it? This action is irreversible.'
                }
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await deletePlace(id)
                        toast.success('The place has been deleted.')
                        router.push('/')
                        router.refresh()
                    } catch {
                        toast.error('An unexpected error has occurred. Please try again later.')
                    }
                }}
            />,
        )
    }

    return (
        <div className="link-red flex items-center gap-x-2 align-top" onClick={handleClick}>
            <Trash2Icon />
            {'Delete place'}
        </div>
    )
}
