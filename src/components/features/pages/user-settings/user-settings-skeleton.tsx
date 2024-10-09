import { FormInputSkeleton } from '@/components/ui/form-input-skeleton'
import { FormTextareaSkeleton } from '@/components/ui/form-textarea-skeleton'

export const UserSettingsSkeleton = () => {
    return (
        <div role="status" className="flex animate-pulse flex-col gap-y-16">
            <section>
                <div className="flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4">
                        <FormInputSkeleton labeled />
                        <FormInputSkeleton labeled />
                        <FormTextareaSkeleton labeled />
                    </div>
                </div>
            </section>
        </div>
    )
}
