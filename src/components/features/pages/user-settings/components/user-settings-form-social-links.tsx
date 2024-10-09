'use client'

import { ChangeEvent } from 'react'

import { useTranslations } from 'next-intl'

import type { IUserSocial } from '@/utils/types/user'

import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import {
    FacebookIcon16,
    InstagramIcon16,
    TelegramIcon16,
    TiktokIcon16,
    XIcon16,
    YoutubeIcon16,
} from '@/components/ui/icons'
import { SocialAppUrls, UserSocialApps } from '@/utils/enums'

type UserSettingsFormSocialLinksProps = {
    initialValue: IUserSocial
    error?: any
    isDisabled?: boolean
    onChange: (value: IUserSocial) => void
}

export const UserSettingsFormSocialLinks = ({
    initialValue,
    error,
    isDisabled,
    onChange,
}: UserSettingsFormSocialLinksProps) => {
    const t = useTranslations()

    const socialInputs = {
        [UserSocialApps.FACEBOOK]: {
            placeholder: 'Facebook',
            icon: <FacebookIcon16 />,
            url: SocialAppUrls.FACEBOOK,
        },
        [UserSocialApps.INSTAGRAM]: {
            placeholder: 'Instagram',
            icon: <InstagramIcon16 />,
            url: SocialAppUrls.INSTAGRAM,
        },
        [UserSocialApps.TELEGRAM]: {
            placeholder: 'Telegram',
            icon: <TelegramIcon16 />,
            url: SocialAppUrls.TELEGRAM,
        },
        [UserSocialApps.TIKTOK]: {
            placeholder: 'Tiktok',
            icon: <TiktokIcon16 />,
            url: SocialAppUrls.TIKTOK,
        },
        [UserSocialApps.X]: {
            placeholder: 'X',
            icon: <XIcon16 />,
            url: SocialAppUrls.X,
        },
        [UserSocialApps.YOUTUBE]: {
            placeholder: 'Youtube',
            icon: <YoutubeIcon16 />,
            url: SocialAppUrls.YOUTUBE,
        },
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedValue: IUserSocial = {
            ...initialValue,
            [e.target.name]: e.target.value,
        }
        onChange(updatedValue as IUserSocial)
    }

    const handleDelete = (app: UserSocialApps) => {
        const updatedValue = { ...initialValue }
        delete updatedValue[app]
        onChange(updatedValue)
    }

    return (
        <div className="flex flex-col gap-y-2">
            <FormSelect
                name="social"
                placeholder={t('page.user.settingsForm.field.contacts.addSocialLink')}
                options={Object.values(UserSocialApps)
                    .sort()
                    .map(app => ({
                        value: app,
                        label: socialInputs[app].placeholder,
                        icon: socialInputs[app].icon,
                    }))}
                disabled={isDisabled}
                onChange={field => {
                    onChange({ ...initialValue, [field]: '' })
                }}
            />

            {Object.entries(initialValue).map(([app, link]) => (
                <FormInput
                    key={`social-input-${app}`}
                    type="text"
                    name={app}
                    value={link}
                    placeholder={socialInputs[app as UserSocialApps].placeholder}
                    disabled={isDisabled}
                    error={error?.[app]}
                    onChange={handleChange}
                    onDelete={() => handleDelete(app as UserSocialApps)}
                />
            ))}
        </div>
    )
}
