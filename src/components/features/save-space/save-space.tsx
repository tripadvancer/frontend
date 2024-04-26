'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SavePlace = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const toast = useToast()
    const dialog = useDialog()
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    const [addPlace] = listAPI.useAddListItemMutation()

    const handleClick = async (listId: number) => {
        try {
            await addPlace({ listId, placeId })
            toast.success('Place saved')
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
                        className="hover-animated cursor-pointer border-t border-blue-20 py-2 last:border-b hover:text-blue-active"
                        onClick={() => handleClick(list.id)}
                    >
                        <div className="overflow-hidden text-ellipsis text-nowrap text-big-bold">{list.name}</div>
                        <div className="text-small text-black-40">Private • {list._count.listToPlace} places</div>
                    </div>
                ))}
            </div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.ok')}
            </FormButton>
        </div>
    )
}
