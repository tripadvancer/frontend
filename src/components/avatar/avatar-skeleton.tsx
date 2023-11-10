import classNames from 'classnames'

type AvatarSkeletonProps = {
    size: number
    className?: string
}

export const AvatarSkeleton = ({ size, className }: AvatarSkeletonProps) => {
    return (
        <div
            role="status"
            className={classNames('animate-pulse rounded-full bg-black-5', className)}
            style={{ width: size, height: size }}
        />
    )
}
