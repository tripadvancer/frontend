export const FormSwitcherSkeleton = () => {
    return (
        <div className="relative h-5 w-7 flex-none rounded-full bg-black-15 hover:bg-black-40">
            <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
        </div>
    )
}
