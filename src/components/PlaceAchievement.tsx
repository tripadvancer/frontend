import Image from 'next/image'

type PlaceAchievementProps = {
    title: string
}

export const PlaceAchievement = ({ title }: PlaceAchievementProps) => {
    return (
        <div className="mb-8 rounded-2xl bg-custom-orange-10 p-8 text-custom-orange-100">
            <div className="flex flex-col items-center gap-2 bg-[url('/images/laurel.svg')] bg-top bg-no-repeat pl-4 pr-4 pt-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M4 23V21H4.99264V1H6.97792V2H20.9987L18.022 7.99991L21 14H6.97792V21H7.97056V23H4ZM6.97792 12V4H17.787L15.8025 8.00009L17.7877 12H6.97792Z"
                    />
                </svg>
                <div className="text-center text-sm font-medium">{title}</div>
            </div>
        </div>
    )
}
