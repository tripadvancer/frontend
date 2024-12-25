'use client'

import { ChangeEvent } from 'react'

import classNames from 'classnames'
import { TrashIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import { SocialAppUrls, UserSocialApps } from '@/utils/enums'

type IUserSocial = Partial<Record<UserSocialApps, string>>

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
            icon: <Image src="/images/icons/social/facebook.svg" width={24} height={24} alt="Facebook" />,
            url: SocialAppUrls.FACEBOOK,
        },
        [UserSocialApps.INSTAGRAM]: {
            placeholder: 'Instagram',
            icon: <Image src="/images/icons/social/instagram.svg" width={24} height={24} alt="Instagram" />,
            url: SocialAppUrls.INSTAGRAM,
        },
        [UserSocialApps.TELEGRAM]: {
            placeholder: 'Telegram',
            icon: <Image src="/images/icons/social/telegram.svg" width={24} height={24} alt="Telegram" />,
            url: SocialAppUrls.TELEGRAM,
        },
        [UserSocialApps.TIKTOK]: {
            placeholder: 'Tiktok',
            icon: <Image src="/images/icons/social/tiktok.svg" width={24} height={24} alt="Tiktok" />,
            url: SocialAppUrls.TIKTOK,
        },
        [UserSocialApps.X]: {
            placeholder: 'X',
            icon: <Image src="/images/icons/social/x.svg" width={24} height={24} alt="X" />,
            url: SocialAppUrls.X,
        },
        [UserSocialApps.YOUTUBE]: {
            placeholder: 'Youtube',
            icon: <Image src="/images/icons/social/youtube.svg" width={24} height={24} alt="Youtube" />,
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
        <div className="flex flex-col gap-y-2 sm:w-1/2">
            <FormSelect
                name="social"
                placeholder={t('page.user.settingsForm.field.contacts.addSocialLink')}
                options={Object.values(UserSocialApps)
                    .sort()
                    .map(app => ({
                        value: app,
                        label: socialInputs[app].placeholder,
                    }))}
                disabled={isDisabled}
                onChange={field => {
                    if (!initialValue[field as UserSocialApps]) {
                        onChange({
                            ...initialValue,
                            [field as UserSocialApps]: '',
                        })
                    }
                }}
            />

            {Object.entries(initialValue).map(([app, link]) => (
                <div key={`social-input-${app}`} className="relative">
                    <div
                        className={classNames('absolute left-3 top-2 z-10 flex items-center gap-x-1', {
                            'cursor-no-drop opacity-30': isDisabled,
                        })}
                    >
                        <div className="text-blue-100">{socialInputs[app as UserSocialApps].icon}</div>
                        <div className="text-black-100">@</div>
                    </div>
                    <FormInput
                        type="text"
                        name={app}
                        value={link}
                        placeholder={socialInputs[app as UserSocialApps].placeholder}
                        disabled={isDisabled}
                        error={error?.[app]}
                        className="[&>input]:pl-[54px] [&>input]:pr-9"
                        onChange={handleChange}
                    />
                    <div
                        className={classNames('absolute right-3 top-3 cursor-pointer text-red-100', {
                            'cursor-no-drop opacity-30': isDisabled,
                        })}
                        onClick={isDisabled ? undefined : () => handleDelete(app as UserSocialApps)}
                    >
                        <TrashIcon size={16} />
                    </div>
                </div>
            ))}
        </div>
    )
}
