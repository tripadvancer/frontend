import { ChangeEvent, useState } from 'react'

import { FormInput } from '@/components/ui/form-input'
import { SocialApps } from '@/utils/enums'

type UserSettingsFormSocialLinksProps = {
    initialValue: Record<SocialApps, string>
    onChange: (value: { [key: string]: string }) => void
}

export const UserSettingsFormSocialLinks = ({ initialValue, onChange }: UserSettingsFormSocialLinksProps) => {
    const [value, setValue] = useState(initialValue)

    const socialInputs = {
        [SocialApps.FACEBOOK]: {
            placeholder: 'Facebook',
            name: 'facebook',
        },
        [SocialApps.INSTAGRAM]: {
            placeholder: 'Instagram',
            name: 'instagram',
        },
        [SocialApps.TELEGRAM]: {
            placeholder: 'Telegram',
            name: 'telegram',
        },
        [SocialApps.TIKTOK]: {
            placeholder: 'Tiktok',
            name: 'tiktok',
        },
        [SocialApps.X]: {
            placeholder: 'X',
            name: 'x',
        },
        [SocialApps.YOUTUBE]: {
            placeholder: 'Youtube',
            name: 'youtube',
        },
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedValue = {
            ...value,
            [e.target.name]: e.target.value,
        }
        setValue(updatedValue)
        onChange(updatedValue)
    }

    return Object.values(SocialApps).map(app => (
        // todo: add FE validation
        <FormInput
            key={`social-input-${app}`}
            type="text"
            name={socialInputs[app].name}
            value={value[app]}
            placeholder={socialInputs[app].placeholder}
            disabled={false}
            onChange={handleChange}
        />
    ))
}
