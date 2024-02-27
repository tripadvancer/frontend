'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IPlace } from '@/utils/types/place'

import { SignIn } from '@/components/features/auth/sign-in'
import { Achievement } from '@/components/ui/achievement'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { FlagIcon48 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarAchivementWrapper = async (place: IPlace) => {
    const doesSessionExist = await Session.doesSessionExist()
    return <PlaceSidebarAchivement {...place} isAuth={doesSessionExist} />
}

const PlaceSidebarAchivement = ({ id, title, isAuth }: IPlace & { isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const placeMeta = placesAPI.useGetPlaceMetaByIdQuery(id, { skip: !isAuth })

    const [addPlaceToVisited] = visitedAPI.useAddPlaceToVisitedMutation()
    const [deletePlaceFromVisited] = visitedAPI.useDeletePlaceFromVisitedMutation()

    const toggleVisited = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        await (placeMeta.data?.isVisited ? deletePlaceFromVisited(id) : addPlaceToVisited(id)).unwrap().catch(() => {
            toast.error(t('common.error'))
        })
    }

    if (placeMeta.isSuccess) {
        return (
            <Achievement icon={<FlagIcon48 />} title={title}>
                <div className="flex justify-between gap-x-1">
                    <div className="whitespace-nowrap">{t('place.i_was_here')}</div>
                    <div className="overflow-hidden">
                        ...........................................................................................................................................................................................................
                    </div>
                    <FormSwitcher checked={placeMeta.data?.isVisited} onChange={toggleVisited} />
                </div>
            </Achievement>
        )
    }

    return <div>Loading ...</div>
}
