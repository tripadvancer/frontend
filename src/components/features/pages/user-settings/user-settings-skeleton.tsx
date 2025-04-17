import { FormButtonSkeleton } from '@/components/ui/form-button-skeleton'
import { FormCheckboxSkeleton } from '@/components/ui/form-checkbox-skeleton'
import { FormInputSkeleton } from '@/components/ui/form-input-skeleton'
import { FormSelectSkeleton } from '@/components/ui/form-select-skeleton'
import { FormTextareaSkeleton } from '@/components/ui/form-textarea-skeleton'

export const UserSettingsSkeleton = () => {
    return (
        <div role="status" className="flex flex-col gap-y-16">
            <section>
                <div className="flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4">
                        <FormInputSkeleton labeled />
                        <FormInputSkeleton labeled />
                        <FormTextareaSkeleton labeled />
                        <div className="flex flex-col gap-y-2">
                            <FormSelectSkeleton labeled />
                            <FormInputSkeleton />
                            <FormInputSkeleton />
                        </div>
                        <FormCheckboxSkeleton labeled />
                    </div>
                    <FormButtonSkeleton className="w-full" />
                </div>
            </section>
        </div>
    )
}
