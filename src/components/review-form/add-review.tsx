import { ReviewForm } from './review-form'

export const AddReview = async () => {
    return (
        <div className="w-full sm:w-104">
            <div className="flex flex-col gap-y-4">
                <ReviewForm />
            </div>
        </div>
    )
}
