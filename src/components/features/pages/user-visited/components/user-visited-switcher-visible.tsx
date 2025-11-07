'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { FormSwitcher } from '@/components/ui/form-switcher'
import { userAPI } from '@/redux/services/user/user.api'

type UserVisitedSwitcherVisibleProps = {
    showMyMap?: boolean
}

export const UserVisitedSwitcherVisible = ({ showMyMap }: UserVisitedSwitcherVisibleProps) => {
    const t = useTranslations()
    const router = useRouter()
    const [updateUserData, { isLoading }] = userAPI.useUpdateUserDataMutation()

    const handleChange = async () => {
        await updateUserData({ settings: { privacy: { show_my_map: !showMyMap } } })
        router.refresh()
    }

    return (
        <div className="flex items-center gap-x-2">
            <FormSwitcher checked={!!showMyMap} onChange={handleChange} />
            <div className="cursor-pointer text-big-bold" onClick={isLoading ? undefined : handleChange}>
                {t('page.user.settingsForm.field.settings.privacy.options.show_my_map')}
            </div>
        </div>
    )
}
