import { PlaceSkeleton } from '@/components/Place/PlaceSkeleton'

export default function Loading() {
    return (
        <div className="grid grid-cols-3 gap-8 phone:grid-cols-1">
            {Array.from({ length: 6 }).map((_, i) => (
                <PlaceSkeleton key={i} />
            ))}
        </div>
    )
}
