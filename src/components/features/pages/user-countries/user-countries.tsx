import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export const UserCountries = ({ userId }: { userId: number }) => {
    return (
        <div className="flex flex-col gap-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex gap-x-4" key={`user-subscription-${index}`}>
                    <ImageWithFallback
                        src={`/images/countries/preview/cy.jpg`}
                        width={256}
                        height={256}
                        className="aspect-square w-24 rounded-xl transition duration-300 group-hover:scale-110"
                        alt="Cyprus"
                    />
                    <div className="flex flex-col justify-between">
                        <div className="text-big-bold">Cyprus</div>
                        <div>
                            <div className="text-black-40">Last updated: 2021-09-01</div>
                            <div className="text-black-40">
                                Places: 123 <span className="text-green-100">+5</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
