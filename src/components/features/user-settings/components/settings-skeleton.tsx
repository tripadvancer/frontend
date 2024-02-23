import { FormButtonSkeleton } from '@/components/ui/form-button-skeleton'
import { FormInputSkeleton } from '@/components/ui/form-input-skeleton'
import { FormTextareaSkeleton } from '@/components/ui/form-textarea-skeleton'

export const SettingsSkeleton = () => {
    return (
        <div role="status" className="flex animate-pulse flex-col gap-y-16">
            <section>
                <div className="flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4">
                        <FormInputSkeleton labeled />
                        <FormInputSkeleton labeled />
                        <FormTextareaSkeleton labeled />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <FormInputSkeleton labeled />
                        <FormInputSkeleton />
                    </div>
                    <FormButtonSkeleton />
                </div>
            </section>
            <section>
                <div className="mb-8 h-7 w-1/3 rounded-lg bg-black-5 sm:h-8" />
                <ul className="flex w-1/3 flex-col gap-y-2 text-big-bold">
                    <li>
                        <div className="flex items-center gap-x-2">
                            <div className="h-6 w-6 rounded-lg bg-black-5" />
                            <div className="h-4 w-2/3 rounded-lg bg-black-5" />
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center gap-x-2">
                            <div className="h-6 w-6 rounded-lg bg-black-5" />
                            <div className="h-4 w-2/3 rounded-lg bg-black-5" />
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center gap-x-2">
                            <div className="h-6 w-6 rounded-lg bg-black-5" />
                            <div className="h-4 w-2/3 rounded-lg bg-black-5" />
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center gap-x-2">
                            <div className="h-6 w-6 rounded-lg bg-black-5" />
                            <div className="h-4 w-2/3 rounded-lg bg-black-5" />
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}
