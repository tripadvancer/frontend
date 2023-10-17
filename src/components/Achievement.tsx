type AchievementProps = {
    title: string
    icon: React.ReactNode
    children?: React.ReactNode
}

export const Achievement = ({ title, icon, children }: AchievementProps) => {
    return (
        <div className="bg-orange-10 rounded-2xl p-8">
            <div className="mb-10 flex flex-col items-center bg-[url('/images/laurel.svg')] bg-top bg-no-repeat pl-4 pr-4 pt-4 text-orange-100">
                {icon}
                <div className="text-center font-medium">{title}</div>
            </div>
            {children}
        </div>
    )
}

type AchievementItemProps = {
    label: string
    value: number
}

const AchievementItems = ({ children }: { children: React.ReactNode }) => {
    return <ul>{children}</ul>
}

const AchievementItem = ({ label, value }: AchievementItemProps) => {
    return (
        <li className="mb-2 flex justify-between gap-x-1">
            <div className="whitespace-nowrap">{label}</div>
            <div className="overflow-hidden">
                ...........................................................................................................................................................................................................
            </div>
            <div className="font-medium">{value}</div>
        </li>
    )
}

Achievement.Items = AchievementItems
Achievement.Item = AchievementItem
