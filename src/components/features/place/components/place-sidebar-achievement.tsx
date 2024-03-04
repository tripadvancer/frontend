'use client'

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
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const PlaceSidebarAchivement = ({ id, title }: IPlace) => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const dialog = useDialog()
    const toast = useToast()
    const response = placesAPI.useGetPlaceMetaByIdQuery(id, { skip: !supertokens.isAuth })

    const [addPlaceToVisited] = visitedAPI.useAddPlaceToVisitedMutation()
    const [deletePlaceFromVisited] = visitedAPI.useDeletePlaceFromVisitedMutation()

    const toggleVisited = async () => {
        if (!supertokens.isAuth) {
            dialog.open(<SignIn />)
            return
        }

        try {
            await (response.data?.isVisited ? deletePlaceFromVisited(id) : addPlaceToVisited(id))
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <Achievement icon={<FlagIcon48 />} title={title}>
            <div className="flex justify-between gap-x-1">
                <div className="whitespace-nowrap">{t('place.i_was_here')}</div>
                <div className="overflow-hidden">
                    ...........................................................................................................................................................................................................
                </div>
                <FormSwitcher checked={!!response.data?.isVisited} onChange={toggleVisited} />
            </div>
        </Achievement>
    )
}
