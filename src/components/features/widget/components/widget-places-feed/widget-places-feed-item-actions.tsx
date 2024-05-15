'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { ChooseNavigate } from '@/components/features/choose-navigate/choose-navigate'
import { Dropdown } from '@/components/ui/dropdown'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16, MoreIcon16, PinIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetPlacesFeedItemActions = (place: IPlacePreview) => {
    const t = useI18n()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { toggle } = useSavePlace(place.id)
    const { showOnMap } = useShowOnMap(place)

    return (
        <div className="flex gap-x-1">
            <Dropdown
                items={[
                    {
                        caption: 'Show on map',
                        value: 'show_on_map',
                        icon: <PinIcon16 />,
                        onClick: showOnMap,
                    },
                    {
                        caption: 'Save',
                        value: 'save',
                        icon: place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />,
                        onClick: toggle,
                    },
                ]}
            >
                <FormButton type="stroke" size="small" icon={<MoreIcon16 />} className="flex-none" />
            </Dropdown>
            <FormButton type="stroke" size="small" onClick={() => dialog.open(<ChooseNavigate lngLat={lngLat} />)}>
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
