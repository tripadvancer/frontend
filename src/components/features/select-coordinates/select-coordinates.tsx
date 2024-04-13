'use client'

import { ChangeEvent } from 'react'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SelectCoordinates = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Location</h1>
            <FormInput
                type={'text'}
                name={''}
                value={''}
                placeholder={''}
                onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                    throw new Error('Function not implemented.')
                }}
            />
            <div className="h-96 w-full bg-black-15"></div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.confirm')}
            </FormButton>
        </div>
    )
}
