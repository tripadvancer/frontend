import classNames from 'classnames'
import { StarIcon } from 'lucide-react'

type FormRatingInputSkeletonProps = {
    className?: string
}

export const FormRatingInputSkeleton = ({ className }: FormRatingInputSkeletonProps) => {
    return (
        <div className={className}>
            <div className="inline-flex text-black-15">
                {Array(5)
                    .fill(null)
                    .map((_, index) => (
                        <div key={`rating-star-${index}`} className={classNames({ 'opacity-30': 3 < index + 1 })}>
                            <StarIcon size={32} fill="currentColor" />
                        </div>
                    ))}
            </div>
        </div>
    )
}
