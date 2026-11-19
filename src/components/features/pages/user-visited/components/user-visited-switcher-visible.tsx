'use client'

import { useRouter } from 'next/navigation'

import { FormSwitcher } from '@/components/ui/form-switcher'
import { userAPI } from '@/utils/redux/services/user/user.api'

type UserVisitedSwitcherVisibleProps = {
    showMyMap?: boolean
}

export const UserVisitedSwitcherVisible = ({ showMyMap }: UserVisitedSwitcherVisibleProps) => {
    const router = useRouter()
    const [updateUserData, { isLoading }] = userAPI.useUpdateUserDataMutation()

    const handleChange = async () => {
        await updateUserData({ settings: { privacy: { show_my_map: !showMyMap } } })
        router.refresh()
    }

    return (
        <div className="flex items-center gap-x-2">
            <FormSwitcher checked={!!showMyMap} onChange={handleChange} />
            <div className="text-big-bold cursor-pointer" onClick={isLoading ? undefined : handleChange}>
                Show my travel journal to everyone
            </div>
        </div>
    )
}
