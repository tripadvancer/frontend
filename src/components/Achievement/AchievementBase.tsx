type AchievementBaseProps = {
    title: string
    icon: React.ReactNode
    body?: React.ReactNode
}

export const AchievementBase = ({ title, icon, body }: AchievementBaseProps) => {
    return (
        <div className="rounded-2xl bg-custom-orange-10 p-8">
            <div className="mb-10 flex flex-col items-center bg-[url('/images/laurel.svg')] bg-top bg-no-repeat pl-4 pr-4 pt-4 text-custom-orange-100">
                {icon}
                <div className="text-center text-sm font-medium">{title}</div>
            </div>
            {body}
        </div>
    )
}
