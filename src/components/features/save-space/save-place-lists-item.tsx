'use client'

import type { IList } from '@/utils/types/list'

import { FormCheckbox } from '@/components/ui/form-checkbox'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

type SavePlaceListsItemProps = {
    list: IList
    placeId: number
}

export const SavePlaceListsItem = ({ list, placeId }: SavePlaceListsItemProps) => {
    const t = useI18n()
    const toast = useToast()

    const [savePlace] = listAPI.useSavePlaceMutation()
    const [unSavePlace] = listAPI.useUnSavePlaceMutation()

    const handleClick = async (list: IList) => {
        const isSaved = list.listToPlace.some(item => item.placeId === placeId)
        const params = { listId: list.id, placeId }
        try {
            await (isSaved ? unSavePlace(params) : savePlace(params))
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div
            className="flex cursor-pointer items-center justify-between gap-x-2 border-t border-blue-20 py-2 last:border-b"
            onClick={() => handleClick(list)}
        >
            <div>
                <div className="overflow-hidden text-ellipsis text-nowrap text-big-bold">{list.name}</div>
                <div className="text-small text-black-40">
                    {list.isPublic ? 'Public' : 'Private'} • {list._count.listToPlace} places
                </div>
            </div>
            <FormCheckbox
                checked={list.listToPlace.some(item => item.placeId === placeId)}
                onChange={() => handleClick(list)}
            />
        </div>
    )
}
