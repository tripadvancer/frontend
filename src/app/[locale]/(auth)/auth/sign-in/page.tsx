import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { Button } from '@/components/forms/Button'
import { Input } from '@/components/forms/Input'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getScopedI18n('pages.auth.sign_in')

    return {
        title: t('meta.title'),
        description: '',
    }
}

export default async function SignIn() {
    const t = await getScopedI18n('pages.auth.sign_in')
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
                    <Input type="password" name="password" placeholder={tForm('password.label')} className="mb-2" />
                    <div className="mb-2 text-center">
                        <Link href="/auth/forgot-password" className="text-sm text-custom-blue-100">
                            {t('link.forgot_password')}
                        </Link>
                    </div>
                    <Button type="submit" className="mb-8 w-full">
                        {t('submit')}
                    </Button>
                    <div className="text-center text-sm">
                        {t('to_back', {
                            sign_up_link: (
                                <Link href="/auth/sign-up" className="text-custom-blue-100">
                                    {tCommon('sign_up_link')}
                                </Link>
                            ),
                        })}
                    </div>
                </form>
            </div>
        </div>
    )
}
