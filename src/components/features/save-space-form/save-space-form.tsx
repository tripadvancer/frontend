'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SavePlaceForm = () => {
    const t = useI18n()
    const dialog = useDialog()
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Save in your lists</h1>
            <div className="">
                {lists?.map(list => (
                    <div key={`list-${list.id}`}>
                        <div>{list.name}</div>
                    </div>
                ))}
            </div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.ok')}
            </FormButton>
        </div>
    )
}
