import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { Button } from '@/components/forms/Button'
import { Input } from '@/components/forms/Input'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getScopedI18n('pages.auth.sign_up')

    return {
        title: t('meta.title'),
        description: '',
    }
}

export default async function SignUp() {
    const t = await getScopedI18n('pages.auth.sign_up')
    const tCommon = await getScopedI18n('common')
    const tForm = await getScopedI18n('forms.fields')

    return (
        <div className="relative">
            <Link href="/" className="absolute left-8 top-8 phone:left-1/2 phone:-translate-x-1/2 phone:transform">
                <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
            </Link>
            <div className="container flex min-h-screen  items-center justify-center phone:px-4">
                <form className="w-96 phone:w-full">
                    <h1 className="mb-8 text-center text-lg font-medium">{t('title')}</h1>
                    <Input type="text" name="email" placeholder={tForm('email.label')} className="mb-2" />
                    <Input type="password" name="username" placeholder={tForm('username.label')} className="mb-2" />
                    <Input type="password" name="password" placeholder={tForm('password.label')} className="mb-2" />
                    <Button type="submit" className="mb-4 w-full">
                        {t('submit')}
                    </Button>

                    <div className="mb-8 text-center text-sm text-custom-black-40">
                        {t('info', {
                            terms_link: (
                                <Link href="/legal/terms-and-conditions" className="text-custom-blue-100">
                                    {tCommon('terms_link')}
                                </Link>
                            ),
                            privacy_link: (
                                <Link href="/legal/privacy-policy" className="text-custom-blue-100">
                                    {tCommon('privacy_link')}
                                </Link>
                            ),
                        })}
                    </div>
                    <div className="text-center text-sm">
                        {t('to_back', {
                            sign_in_link: (
                                <Link href="/auth/sign-in" className="text-custom-blue-100">
                                    {tCommon('sign_in_link')}
                                </Link>
                            ),
                        })}
                    </div>
                </form>
            </div>
        </div>
    )
}
