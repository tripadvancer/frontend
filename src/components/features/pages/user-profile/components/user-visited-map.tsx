import type { IUserVisitedCountry } from '@/utils/types/user'

type UserVisitedMapProps = {
    visitedCountries: IUserVisitedCountry[]
}

export const UserVisitedMap = ({ visitedCountries }: UserVisitedMapProps) => {
    return <div className="relative h-[480px] rounded-2xl bg-blue-80 fill-black-40 p-4" />
}
