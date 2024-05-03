'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SavePlaceLists } from './save-place-lists'

export const SavePlace = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Save in your lists</h1>
            <SavePlaceLists placeId={placeId} />
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.close')}
            </FormButton>
        </div>
    )
}
