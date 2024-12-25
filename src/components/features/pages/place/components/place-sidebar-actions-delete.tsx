'use client'

import { Trash2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { Confirmation } from '@/components/ui/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places.api'

type PlaceSidebarActionsDeleteProps = {
    id: number
}

export const PlaceSidebarActionsDelete = ({ id }: PlaceSidebarActionsDeleteProps) => {
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
                        await deletePlace(id)
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
            <Trash2Icon />
            {t('common.action.place.delete')}
        </div>
    )
}
