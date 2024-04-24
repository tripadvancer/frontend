'use client'

import type { IPlace } from '@/utils/types/place'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { PinLocationIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsCheckIn = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })

    const [checkIn] = visitedAPI.useAddPlaceToVisitedMutation()
    const [checkOut] = visitedAPI.useDeletePlaceFromVisitedMutation()

    const toggle = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        try {
            await (meta?.isVisited ? checkOut(place.id) : checkIn(place.id))
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex cursor-pointer items-center gap-x-2" onClick={toggle}>
                <PinLocationIcon24 />
                {t('place.actions.i_was_here')}
            </div>
            <FormSwitcher checked={!!meta?.isVisited} onChange={toggle} />
        </div>
    )
}
