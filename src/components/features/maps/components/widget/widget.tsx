import Image from 'next/image'

import { getSelectedCategories } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'

import { Categories } from './components/categories'
import { Places } from './components/places'
import { Section } from './components/section'

export const Widget = () => {
    const selectedCategories = useAppSelector(getSelectedCategories)

    return (
        <div className="fixed z-40 w-full rounded-b-2xl bg-white shadow-small sm:right-8 sm:top-8 sm:w-[448px] sm:rounded-2xl">
            <div className="p-4 sm:p-8">
                <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
            </div>

            <Section
                title="Categories"
                variant="blue"
                info={selectedCategories.length > 0 ? `${selectedCategories.length} selected` : ''}
            >
                <Categories />
            </Section>

            <Section title="Places" variant="white">
                <Places />
            </Section>
        </div>
    )
}
