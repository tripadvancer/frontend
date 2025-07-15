'use client'

import Image from 'next/image'

import { HeaderSearchItem } from './header-search-item'

export const HeaderSearchRecent = () => {
    return (
        <div>
            <hr className="my-1" />
            <div className="mb-1 mt-4 pl-3 text-black-70">Recently viewed places:</div>
            <HeaderSearchItem
                title="Love Bridge"
                info="Cyprus"
                icon={
                    <Image
                        src="https://imagedelivery.net/ZBEqKIKgZgKrPlD3ay4FLg/feb839f0-b86c-4b82-d147-a39cb17eb300/preview"
                        alt="Love Bridge"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                }
                href="#"
            />
            <HeaderSearchItem
                title="Cape Greko"
                info="Cyprus"
                icon={
                    <Image
                        src="https://imagedelivery.net/ZBEqKIKgZgKrPlD3ay4FLg/de90f106-b0c2-4cfd-627b-ad421a03e500/preview"
                        alt="Cape Greko"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                }
                href="#"
            />
            <HeaderSearchItem
                title="Athalassa Park: The Perfect Spot for Cycling in Nicosia"
                info="Cyprus"
                icon={
                    <Image
                        src="https://imagedelivery.net/ZBEqKIKgZgKrPlD3ay4FLg/d775f5a1-5149-463b-ffae-42ba9cbaf300/preview"
                        alt="Athalassa Park: The Perfect Spot for Cycling in Nicosia"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                }
                href="#"
            />
        </div>
    )
}
