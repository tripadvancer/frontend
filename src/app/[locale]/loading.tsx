import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
    return (
        <div className="flex-center h-screen w-screen bg-blue-20 text-white">
            <Spinner size={96} />
        </div>
    )
}
