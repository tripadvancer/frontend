import { ButtonSkeleton } from '@/components/forms/button/button-skeleton'
import { InputSkeleton } from '@/components/forms/input/input-skeleton'
import { TextareaSkeleton } from '@/components/forms/textarea/textarea-skeleton'

export const UserSettingsSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
                <InputSkeleton labeled />
                <InputSkeleton labeled />
                <TextareaSkeleton labeled />
            </div>
            <div className="flex flex-col gap-y-2">
                <InputSkeleton labeled />
                <InputSkeleton />
            </div>
            <ButtonSkeleton />
        </div>
    )
}
