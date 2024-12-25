import { StarIcon } from 'lucide-react'

import { StarIcon16 } from '@/components/ui/icons'

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
                        {size === 16 && <StarIcon size={16} fill="currentColor" />}
                        {size === 32 && <StarIcon size={32} fill="currentColor" />}
                    </div>
                ))}
        </div>
    )
}
