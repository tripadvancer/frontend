'use client'

import { ChangeEvent } from 'react'

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

    const handleChange = async () => {
        const isSaved = list.listToPlace.some(item => item.placeId === placeId)
        const params = { listId: list.id, placeId }
        try {
            await (isSaved ? unSavePlace(params) : savePlace(params))
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex items-center justify-between gap-x-4">
            <div className="flex gap-x-2">
                <FormCheckbox
                    id={list.id.toString()}
                    name="list"
                    value={list.id.toString()}
                    caption={list.name}
                    checked={list.listToPlace.some(item => item.placeId === placeId)}
                    onChange={handleChange}
                />
            </div>
            <div className="flex gap-x-2 text-small text-black-40">
                {t('save_place.places', { count: list.listToPlace.length })}
            </div>
        </div>
    )
}
