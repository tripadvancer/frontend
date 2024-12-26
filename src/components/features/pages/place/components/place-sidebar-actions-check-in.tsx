'use client'

import { MapPinCheckIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places.api'
import { visitedAPI } from '@/redux/services/visited.api'

type PlaceSidebarActionsCheckInProps = {
    id: number
    isAuth: boolean
}

export const PlaceSidebarActionsCheckIn = ({ id, isAuth }: PlaceSidebarActionsCheckInProps) => {
    const t = useTranslations()
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
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 cursor-pointer items-center gap-x-2" onClick={toggle}>
                <MapPinCheckIcon />
                {t('common.action.place.iWasHere')}
            </div>
            <FormSwitcher checked={!!meta?.isVisited} onChange={toggle} />
        </div>
    )
}
