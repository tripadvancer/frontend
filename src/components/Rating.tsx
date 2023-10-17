type RatingProps = {
    rating: number
}

export const Rating = ({ rating }: RatingProps) => {
    return (
        <div className="flex items-center text-orange-100">
            {Array(5)
                .fill(null)
                .map((_, index) => (
                    <svg
                        key={index}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className={Math.round(rating) >= index + 1 ? 'opacity-100' : 'opacity-30'}
                    >
                        <path d="M4.42507 9.87848L3.58125 14.7983L7.99955 12.4755L12.4178 14.7983L11.574 9.87848L15.1485 6.39422L10.2087 5.67642L7.99955 1.2002L5.7904 5.67642L0.850586 6.39422L4.42507 9.87848Z" />
                    </svg>
                ))}
        </div>
    )
}
