'use client'

import { ChangeEvent } from 'react'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import type { IUserSocial } from '@/utils/types/user'

import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import {
    DeleteIcon16,
    FacebookIcon16,
    FacebookIcon24,
    InstagramIcon16,
    InstagramIcon24,
    TelegramIcon16,
    TelegramIcon24,
    TiktokIcon16,
    TiktokIcon24,
    XIcon16,
    XIcon24,
    YoutubeIcon16,
    YoutubeIcon24,
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
            icon16: <FacebookIcon16 />,
            icon24: <FacebookIcon24 />,
            url: SocialAppUrls.FACEBOOK,
        },
        [UserSocialApps.INSTAGRAM]: {
            placeholder: 'Instagram',
            icon16: <InstagramIcon16 />,
            icon24: <InstagramIcon24 />,
            url: SocialAppUrls.INSTAGRAM,
        },
        [UserSocialApps.TELEGRAM]: {
            placeholder: 'Telegram',
            icon16: <TelegramIcon16 />,
            icon24: <TelegramIcon24 />,
            url: SocialAppUrls.TELEGRAM,
        },
        [UserSocialApps.TIKTOK]: {
            placeholder: 'Tiktok',
            icon16: <TiktokIcon16 />,
            icon24: <TiktokIcon24 />,
            url: SocialAppUrls.TIKTOK,
        },
        [UserSocialApps.X]: {
            placeholder: 'X',
            icon16: <XIcon16 />,
            icon24: <XIcon24 />,
            url: SocialAppUrls.X,
        },
        [UserSocialApps.YOUTUBE]: {
            placeholder: 'Youtube',
            icon16: <YoutubeIcon16 />,
            icon24: <YoutubeIcon24 />,
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
                        icon: socialInputs[app].icon16,
                    }))}
                disabled={isDisabled}
                onChange={field => {
                    onChange({ ...initialValue, [field]: '' })
                }}
            />

            {Object.entries(initialValue).map(([app, link]) => (
                <div key={`social-input-${app}`} className="relative">
                    <div className="absolute left-3 top-5 z-10 flex -translate-y-1/2 items-center gap-x-1">
                        <div className="text-blue-100">{socialInputs[app as UserSocialApps].icon24}</div>
                        <div className="text-black-100">@</div>
                    </div>
                    <FormInput
                        type="text"
                        name={app}
                        value={link}
                        placeholder={socialInputs[app as UserSocialApps].placeholder}
                        disabled={isDisabled}
                        error={error?.[app]}
                        className="pl-[54px]"
                        onChange={handleChange}
                    />
                    <div
                        className={classNames('absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-red-100', {
                            'cursor-no-drop opacity-30': isDisabled,
                        })}
                        onClick={isDisabled ? undefined : () => handleDelete(app as UserSocialApps)}
                    >
                        <DeleteIcon16 />
                    </div>
                </div>
            ))}
        </div>
    )
}
