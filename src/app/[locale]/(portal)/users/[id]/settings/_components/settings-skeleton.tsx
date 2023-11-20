import { ButtonSkeleton } from '@/components/forms/button/button-skeleton'
import { FileInputSkeleton } from '@/components/forms/file-input/file-input-skeleton'
import { InputSkeleton } from '@/components/forms/input/input-skeleton'
import { TextareaSkeleton } from '@/components/forms/textarea/textarea-skeleton'

export const SettingsSkeleton = () => {
    return (
        <div role="status" className="flex animate-pulse flex-col gap-y-16">
            <section>
                <div className="flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4">
                        <FileInputSkeleton labeled />
                        <InputSkeleton labeled />
                        <TextareaSkeleton labeled />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <InputSkeleton labeled />
                        <InputSkeleton />
                    </div>
                    <ButtonSkeleton />
                </div>
            </section>
            <section>
                <div className="mb-8 h-7 w-1/3 rounded-lg bg-black-5 sm:h-8" />
                <div className="inline-flex w-full flex-col gap-y-2">
                    <div className="h-6 w-2/3 rounded-lg bg-black-5" />
                    <div className="h-6 w-2/3 rounded-lg bg-black-5" />
                </div>
            </section>
        </div>
    )
}
