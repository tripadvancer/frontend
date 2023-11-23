import { Spinner } from '@/components/spinner'

export default function Loading() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-blue-20 text-white">
            <Spinner size={96} />
        </div>
    )
}
