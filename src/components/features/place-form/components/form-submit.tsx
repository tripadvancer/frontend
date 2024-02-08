'use client'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

type FormSubmitProps = {
    isLoading: boolean
}

export const FormSubmit = ({ isLoading }: FormSubmitProps) => {
    const t = useI18n()

    return (
        <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <div className="flex-1">
                <FormButton htmlType="submit" className="mb-4 w-full" isLoading={isLoading}>
                    {t('common.action.save_changes')}
                </FormButton>
                <p className="text-center text-small text-black-40">
                    {t('pages.add_place.submit.info', {
                        terms_link: <Link href="/legal/terms-and-conditions">{t('common.link.terms')}</Link>,
                        privacy_link: <Link href="/legal/privacy-policy">{t('common.link.privacy')}</Link>,
                    })}
                </p>
            </div>
            <div className="hidden w-64 lg:block" />
        </div>
    )
}
