export const UserActionsSkeleton = () => {
    return (
        <ul className="flex flex-col gap-y-2 text-big-bold">
            <li>
                <div className="flex items-center gap-x-2">
                    <div className="h-6 w-6 rounded-lg bg-black-5" />
                    <div className="h-4 w-2/3 rounded-lg bg-black-5" />
                </div>
            </li>
        </ul>
    )
}
