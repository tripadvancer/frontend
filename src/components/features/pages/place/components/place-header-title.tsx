import type { IPlace } from '@/utils/types/place'

export const PlaceHeaderTitle = ({ title }: IPlace) => {
    return <h1 className="h1 max-w-full break-words text-center text-white">{title}</h1>
}
