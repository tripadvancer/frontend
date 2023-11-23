import { Spinner } from './spinner'

export const GlobalLoading = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-blue-20 text-white">
            <Spinner size={96} />
        </div>
    )
}
