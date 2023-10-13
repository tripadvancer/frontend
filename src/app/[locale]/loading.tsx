import { Spinner } from '@/components/Spinner'

export default function Loading() {
    return (
        <div className="flex h-screen w-screen items-center justify-center text-white">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-custom-blue-100 opacity-30" />
            <Spinner size={96} />
        </div>
    )
}
