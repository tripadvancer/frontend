'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'

export const PlaceFormSubmit = ({ isLoading }: { isLoading: boolean }) => {
    const t = useTranslations()

    return (
        <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <div className="flex-1">
                <FormButton htmlType="submit" className="mb-4 w-full" isLoading={isLoading}>
                    {t('common.action.saveChanges')}
                </FormButton>
                <p className="text-center text-small text-black-40">
                    {t.rich('page.placeForm.terms', {
                        termsLink: termsLink => <Link href="/legal/terms-and-conditions">{termsLink}</Link>,
                        privacyLink: privacyLink => <Link href="/legal/privacy-policy">{privacyLink}</Link>,
                    })}
                </p>
            </div>
            <div className="hidden w-64 lg:block" />
        </div>
    )
}
