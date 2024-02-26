import type { IPlace } from '@/utils/types/place'

export const PlaceHeaderTitle = ({ title }: IPlace) => {
    return <h1 className="text-center text-h1-m text-white sm:text-h1">{title}</h1>
}
