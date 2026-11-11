'use client'

import { MapPinCheckIcon } from 'lucide-react'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { visitedAPI } from '@/utils/redux/services/visited/visited.api'

type PlaceSidebarActionsCheckInProps = {
    id: number
    isAuth: boolean
}

export const PlaceSidebarActionsCheckIn = ({ id, isAuth }: PlaceSidebarActionsCheckInProps) => {
    const dialog = useDialog()
    const toast = useToast()

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(id, { skip: !isAuth })

    const [checkIn] = visitedAPI.useAddPlaceToVisitedMutation()
    const [checkOut] = visitedAPI.useDeletePlaceFromVisitedMutation()

    const toggle = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        try {
            await (meta?.isVisited ? checkOut(id) : checkIn(id))
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 cursor-pointer items-center gap-x-2" onClick={toggle}>
                <MapPinCheckIcon />
                {'I was here'}
            </div>
            <FormSwitcher checked={!!meta?.isVisited} onChange={toggle} />
        </div>
    )
}
