import { ReviewForm } from './review-form'

export const AddReview = () => {
    return (
        <div className="w-full sm:w-104">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-h7">Leave feedback</h1>
                <hr className="border-black-70" />
                <ReviewForm />
            </div>
        </div>
    )
}
