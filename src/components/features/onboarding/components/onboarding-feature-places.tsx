'use client'

import Image from 'next/image'

import { useI18n } from '@/utils/i18n/i18n.client'

export const OnboardingFeaturePlaces = () => {
    const t = useI18n()

    return (
        <div className="flex gap-x-16">
            <Image src="/images/pic-1.svg" width={352} height={352} alt="" />
            <div className="flex flex-col gap-y-8">
                <h3 className="h5">{t('onboarding.features.places.title', { br: <br /> })}</h3>
                <div className="flex flex-col gap-y-4">
                    <p>{t('onboarding.features.places.description.1')}</p>
                    <p>{t('onboarding.features.places.description.2')}</p>
                </div>
            </div>
        </div>
    )
}
