'use client'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'

export const PhotoAttribute = () => {
    const t = useTranslations()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Add a photo attribute</h1>

            <div className="flex flex-col gap-y-8">
                <FormInput
                    type="text"
                    name="location"
                    value=""
                    autoComplete="off"
                    autoFocus
                    placeholder={'Enter a photo attribute'}
                    onChange={() => {}}
                    error=""
                />
                <FormButton onClick={() => {}} isDisabled={false}>
                    {t('common.action.confirm')}
                </FormButton>
            </div>
        </div>
    )
}
