'use client'

import classNames from 'classnames'

import { IList } from '@/utils/types/list'

import { FormButton } from '@/components/ui/form-button'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SavePlace = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const toast = useToast()
    const dialog = useDialog()
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    const [savePlace] = listAPI.useSavePlaceMutation()
    const [unSavePlace] = listAPI.useUnSavePlaceMutation()

    const handleClick = async (list: IList) => {
        // check if place is already saved
        const isPlaceSaved = list.listToPlace.some(item => item.placeId === placeId)
        const params = { listId: list.id, placeId }
        try {
            await (isPlaceSaved ? unSavePlace(params) : savePlace(params))
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Save in your lists</h1>
            <div className="">
                {lists?.map(list => (
                    <div
                        key={`list-${list.id}`}
                        className="flex cursor-pointer items-center justify-between gap-x-2 border-t border-blue-20 py-2 last:border-b"
                        onClick={() => handleClick(list)}
                    >
                        <div>
                            <div className="overflow-hidden text-ellipsis text-nowrap text-big-bold">{list.name}</div>
                            <div className="text-small text-black-40">
                                {list.isPublic ? 'Public' : 'Private'} • {list._count.listToPlace} places
                            </div>
                        </div>
                        <FormSwitcher
                            checked={list.listToPlace.some(item => item.placeId === placeId)}
                            onChange={() => handleClick(list)}
                        />
                    </div>
                ))}
            </div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.close')}
            </FormButton>
        </div>
    )
}
