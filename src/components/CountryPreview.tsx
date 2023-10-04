import Image from 'next/image'
import Link from 'next/link'

import { getCountryNameByCode } from '@/utils/countries'
import { ICountry } from '@/utils/interfaces'

type CountryPreviewProps = ICountry

export const CountryPreview = ({ countryCode, placesCount }: CountryPreviewProps) => {
    const countryName = getCountryNameByCode(countryCode)

    return (
        <figure className="overflow-hidden rounded-2xl bg-custom-orange-10">
            <div className="w-full overflow-hidden">
                <Link href={`/countries/${countryCode.toLowerCase()}`}>
                    <Image
                        src={`https://source.unsplash.com/256x256/?${countryName}`}
                        width={256}
                        height={256}
                        alt={countryName}
                        className="rounded-t-2xl object-cover transition duration-300 hover:scale-110"
                    />
                </Link>
            </div>
            <figcaption className="flex flex-col justify-between p-4">
                <div className="mb-4 h-12 text-base font-medium text-custom-black-100">{countryName}</div>
                <div className="flex flex-row items-center gap-2 text-sm font-medium text-custom-blue-100">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 4.94132C14.7614 4.94132 17 7.14705 17 9.86796C17 12.5889 14.7614 14.7946 12 14.7946C9.23858 14.7946 7 12.5889 7 9.86796C7 7.14705 9.23858 4.94132 12 4.94132ZM9 9.86796C9 8.23541 10.3431 6.91197 12 6.91197C13.6569 6.91197 15 8.23541 15 9.86796C15 11.5005 13.6569 12.8239 12 12.8239C10.3431 12.8239 9 11.5005 9 9.86796Z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M12 23L12.6577 22.4341C18.1887 17.6754 21 13.5203 21 9.86796C21 4.69564 16.9029 1 12 1C7.09705 1 3 4.69564 3 9.86796C3 13.5203 5.81131 17.6754 11.3423 22.4341L12 23ZM12 20.3749C7.30661 16.2071 5 12.6754 5 9.86796C5 5.82476 8.16411 2.97066 12 2.97066C15.8359 2.97066 19 5.82476 19 9.86796C19 12.6754 16.6934 16.2071 12 20.3749Z"
                        />
                    </svg>
                    {placesCount} places
                </div>
            </figcaption>
        </figure>
    )
}
