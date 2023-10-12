type AchievementItemProps = {
    label: string
    value: number
}

export const AchievementItem = ({ label, value }: AchievementItemProps) => {
    return (
        <li className="mb-2 flex justify-between gap-x-1">
            <div className="whitespace-nowrap">{label}</div>
            <div className="overflow-hidden">
                ..............................................................................................................................................................................................
            </div>
            <div className="font-medium">{value}</div>
        </li>
    )
}
