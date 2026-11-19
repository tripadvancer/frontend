import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
    return (
        <div className="flex-center bg-blue-20 relative z-50 h-screen w-screen text-white">
            <Spinner size={96} />
        </div>
    )
}
