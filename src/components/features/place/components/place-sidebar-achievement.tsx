'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { Achievement } from '@/components/ui/achievement'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { GlobalLoading } from '@/components/ui/global-loading'
import { FlagIcon48 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { getIsAuth } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarAchivement = ({ placeId }: { placeId: string }) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const isAuth = useAppSelector(getIsAuth)
    const place = placesAPI.useGetPlaceByIdQuery(parseInt(placeId))

    const [addPlaceToVisited] = visitedAPI.useAddPlaceToVisitedMutation()
    const [deletePlaceFromVisited] = visitedAPI.useDeletePlaceFromVisitedMutation()

    const toggleVisited = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        await (place.data?.isVisited ? deletePlaceFromVisited(parseInt(placeId)) : addPlaceToVisited(parseInt(placeId)))
            .unwrap()
            .catch(() => {
                toast.error(t('common.error'))
            })
    }

    if (place.isSuccess) {
        return (
            <Achievement icon={<FlagIcon48 />} title={place.data.title}>
                <div className="flex justify-between gap-x-1">
                    <div className="whitespace-nowrap">{t('place.i_was_here')}</div>
                    <div className="overflow-hidden">
                        ...........................................................................................................................................................................................................
                    </div>
                    <FormSwitcher checked={place.data.isVisited} onChange={toggleVisited} />
                </div>
            </Achievement>
        )
    }

    return <GlobalLoading />
}
