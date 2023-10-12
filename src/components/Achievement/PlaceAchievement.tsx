import { AchievementBase } from './AchievementBase'

type PlaceAchievementProps = {
    title: string
}

export const PlaceAchievement = ({ title }: PlaceAchievementProps) => {
    return (
        <AchievementBase
            icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M4 23V21H4.99264V1H6.97792V2H20.9987L18.022 7.99991L21 14H6.97792V21H7.97056V23H4ZM6.97792 12V4H17.787L15.8025 8.00009L17.7877 12H6.97792Z"
                    />
                </svg>
            }
            title={title}
        />
    )
}
