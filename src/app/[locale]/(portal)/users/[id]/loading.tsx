import { PlaceSkeletons } from '@/components/PlaceSkeletons'

export default function Loading() {
    return (
        <div className="grid grid-cols-3 gap-8 phone:grid-cols-1">
            <PlaceSkeletons />
        </div>
    )
}
