import { Spinner } from '@/components/ui/spinner'

export const GlobalLoading = () => {
    return (
        <div className="flex-center fixed bottom-0 left-0 right-0 top-0 z-50 bg-blue-20 text-white">
            <Spinner size={96} />
        </div>
    )
}
