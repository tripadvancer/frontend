import { MoreIcon16 } from '@/components/ui/icons'

export const ActionButtonSkeleton = () => {
    return (
        <div role="status" className="flex-center h-8 w-8 animate-pulse rounded-lg bg-black-5 text-black-15">
            <MoreIcon16 />
        </div>
    )
}
