import type { IPlace } from '@/utils/types/place'

export const PlaceHeaderTitle = ({ title }: IPlace) => {
    return <h1 className="max-w-full break-words text-center text-h1-m text-white sm:text-h1">{title}</h1>
}
