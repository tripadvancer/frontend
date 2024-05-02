import { StarIcon16, StarIcon32 } from '@/components/ui/icons'

type RatingProps = {
    value: number
    size: 16 | 32
}

export const Rating = ({ value, size }: RatingProps) => {
    return (
        <div className="flex items-center text-orange-100">
            {Array(5)
                .fill(null)
                .map((_, index) => (
                    <div
                        key={`rating-star-${index}`}
                        className={Math.round(value) >= index + 1 ? 'opacity-100' : 'opacity-30'}
                    >
                        {size === 16 && <StarIcon16 />}
                        {size === 32 && <StarIcon32 />}
                    </div>
                ))}
        </div>
    )
}
