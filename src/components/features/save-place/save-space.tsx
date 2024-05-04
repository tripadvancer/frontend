'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SavePlaceLists } from './save-place-lists'

export const SavePlace = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('save_place.title')}</h1>
            <hr className="border-black-70" />
            <form className="flex flex-col gap-y-8">
                <SavePlaceLists placeId={placeId} />
                <div className="flex gap-x-2">
                    <FormButton htmlType="submit" isLoading={false}>
                        {t('common.action.save')}
                    </FormButton>
                    <FormButton type="stroke" onClick={() => dialog.close()}>
                        {t('common.action.cancel')}
                    </FormButton>
                </div>
            </form>
        </div>
        // <div className="flex w-full flex-col gap-y-8 sm:w-104">
        //     <h1 className="h7 text-center">{t('save_place.title')}</h1>
        //     <SavePlaceLists placeId={placeId} />
        //     <FormButton type="stroke" onClick={() => dialog.close()}>
        //         {t('common.action.close')}
        //     </FormButton>
        // </div>
    )
}
